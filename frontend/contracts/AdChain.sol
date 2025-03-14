// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdChain is Ownable {
    
    constructor() Ownable(msg.sender) {}
    
    struct Ad {
        address advertiser;
        uint256 budget;
        uint256 costPerClick;
        string ipfsAdData;
        string displayImage;
        string title;
        string description;
        string destinationUrl;
        string placementSize; // New field for ad placement size
        uint256 clicks;
        bool active;
        uint256 expiration;
    }

    mapping(uint256 => Ad) public ads;
    mapping(address => uint256) public publisherEarnings;
    uint256 public adCounter;
    uint256 public constant MIN_WITHDRAW = 50 * 1e18; // 50 USDT
    address public constant USDT_ADDRESS = 0x1BB57c357a233A33E5A968Df70eaFB2b1B7255A3; // USDT contract address

    event ClickRecorded(uint256 adId, address publisher);
    event Payout(address publisher, uint256 amount);
    event AdCreated(uint256 adId, address advertiser);
    event AdEdited(uint256 adId, address advertiser);
    event AdFunded(uint256 adId, uint256 amount);

    // Define ad sizes
    string public constant LEADERBOARD = "Leaderboard"; // 728 x 90
    string public constant MEDIUM_RECTANGLE = "Medium Rectangle"; // 300 x 250
    string public constant LARGE_RECTANGLE = "Large Rectangle"; // 336 x 280
    string public constant SKYSCRAPER = "Skyscraper"; // 160 x 600
    string public constant HALF_PAGE_AD = "Half Page Ad"; // 300 x 600

    function createAd(
        uint256 _costPerClick,
        string memory _ipfsAdData,
        string memory _displayImage,
        string memory _title,
        string memory _description,
        string memory _destinationUrl,
        string memory _placementSize,
        uint256 _duration
    ) external {
        require(
            compareStrings(_placementSize, LEADERBOARD) ||
            compareStrings(_placementSize, MEDIUM_RECTANGLE) ||
            compareStrings(_placementSize, LARGE_RECTANGLE) ||
            compareStrings(_placementSize, SKYSCRAPER) ||
            compareStrings(_placementSize, HALF_PAGE_AD),
            "Invalid placement size"
        );

        ads[adCounter] = Ad(
            msg.sender,
            0,
            _costPerClick,
            _ipfsAdData,
            _displayImage,
            _title,
            _description,
            _destinationUrl,
            _placementSize,
            0,
            true,
            block.timestamp + _duration
        );
        emit AdCreated(adCounter, msg.sender);
        adCounter++;
    }


    function fundAd(uint256 _adId, uint256 _amount) external {
        Ad storage ad = ads[_adId];
        require(ad.advertiser == msg.sender, "Not your ad");

        IERC20 usdt = IERC20(USDT_ADDRESS);
        require(usdt.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        ad.budget += _amount;
        ad.active = true;
        emit AdFunded(_adId, _amount);
    }

    function recordClick(uint256 _adId) external {
        Ad storage ad = ads[_adId];
        require(ad.active, "Ad is paused");
        require(ad.budget >= ad.costPerClick, "Ad budget exhausted");
        require(block.timestamp < ad.expiration, "Ad has expired");

        ad.clicks++;
        ad.budget -= ad.costPerClick;
        publisherEarnings[msg.sender] += ad.costPerClick;

        if (ad.budget == 0) {
            ad.active = false;
        }

        emit ClickRecorded(_adId, msg.sender);
    }

    function getActiveAds(string memory _placementSize) external view returns (Ad[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < adCounter; i++) {
            if (compareStrings(ads[i].placementSize, _placementSize) && ads[i].active && block.timestamp < ads[i].expiration) {
                count++;
            }
        }

        Ad[] memory activeAds = new Ad[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < adCounter; i++) {
            if (compareStrings(ads[i].placementSize, _placementSize) && ads[i].active && block.timestamp < ads[i].expiration) {
                activeAds[index] = ads[i];
                index++;
            }
        }
        return activeAds;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

    function withdrawEarnings() external {
        uint256 amount = publisherEarnings[msg.sender];
        require(amount >= MIN_WITHDRAW, "Minimum withdrawal not reached");

        IERC20 usdt = IERC20(USDT_ADDRESS);
        require(usdt.transfer(msg.sender, amount), "Payout failed");

        publisherEarnings[msg.sender] = 0;
        emit Payout(msg.sender, amount);
    }

    function editAd(
        uint256 _adId,
        uint256 _costPerClick,
        string memory _ipfsAdData,
        string memory _displayImage,
        string memory _title,
        string memory _description,
        string memory _destinationUrl,
        string memory _placementSize
    ) external {
        Ad storage ad = ads[_adId];
        require(ad.advertiser == msg.sender, "Not your ad");
        ad.costPerClick = _costPerClick;
        ad.ipfsAdData = _ipfsAdData;
        ad.displayImage = _displayImage;
        ad.title = _title;
        ad.description = _description;
        ad.destinationUrl = _destinationUrl;
        ad.placementSize = _placementSize;

        emit AdEdited(_adId, msg.sender);
    }
}