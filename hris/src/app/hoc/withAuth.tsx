import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/providers/auth";
import { Flex, Spin } from "antd";
import React from "react";

interface IWithAuthProps {
  allowedRoles?: string[];
}

const roleMap: Record<number, string> = {
  1: "admin",
  2: "employee",
  3: "hrManager"
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles = [] }: IWithAuthProps = {}
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { isSuccess, isPending, currentUser, isError } = useAuthState();
    const router = useRouter();

    const userRoles = currentUser?.roles?.map((r) => roleMap[r.roleId]) || [];

    useEffect(() => {
      if (!isPending && currentUser) {
        const hasValidRole =
          allowedRoles.length === 0 ||
          userRoles.some((role) => allowedRoles.includes(role));

        if (isError || !hasValidRole) {
          if (userRoles.includes("admin")) {
            router.replace("/hrManager");
          } else if (userRoles.includes("employee")) {
            router.replace("/employee");
          } else {
            router.replace("/");
          }
        }
      }
    }, [isPending, isError, currentUser, allowedRoles, router, userRoles]);

    if (isPending || !isSuccess) {
      return (
        <Flex justify="center" style={{ marginBottom: 20 }}>
          <Spin size="large" />
        </Flex>
      );
    }

    const isAuthorized =
      allowedRoles.length === 0 ||
      userRoles.some((role) => allowedRoles.includes(role));

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
