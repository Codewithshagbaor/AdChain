import { useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user && !allowedRoles.includes(user.role)) {
            router.push("/unauthorized");
        }
    }, [user, router]);

    return <>{children}</>;
};

export default ProtectedRoute;
