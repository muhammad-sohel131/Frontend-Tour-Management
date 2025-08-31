import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App
    },
    {
        Component: AdminLayout ,
        path: '/admin',
        children: [
            {
                Component: Analytics,
                path: 'analytics'
            }
        ]
    }
])