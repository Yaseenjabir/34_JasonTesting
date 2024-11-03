import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

export default function Layout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const session = sessionStorage.getItem("admin");
    if (!session) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
