import { lazy, Suspense } from "react";
import { Navigate, type LoaderFunctionArgs } from "react-router";
import { getProductList } from "../api/productsApi";

const ProductsList = lazy(() => import("../pages/products/listPage"));
const ProductsIndex = lazy(() => import("../pages/products/indexPage"));
const ProductsAdd = lazy(() => import("../pages/products/addPage"));
const Loading = () => <div>Products Loading....</div>;

async function loadProducts({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const size = url.searchParams.get("size") || "10";
    return getProductList({ page, size });
}

export default function productsRouter() {
    return {
        path: "products",
        Component: ProductsIndex,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading />}><ProductsList /></Suspense>,
                loader: loadProducts,
            },
            {
                index: true,
                element: <Navigate to="/products/list" replace />
            },
            {
                path: "add",
                element: <Suspense fallback={<Loading />}><ProductsAdd /></Suspense>,
            },
        ],
    };
}