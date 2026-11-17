import { lazy, Suspense } from "react";
import { Navigate } from "react-router";

const ProductsIndex = lazy(() => import("../pages/products/indexPage"));
const ProductsList = lazy(() => import("../pages/products/listPage"));
const ProductsAdd = lazy(() => import("../pages/products/addPage"));
const ProductRead = lazy(() => import("../pages/products/readPage"));
const ProductModify = lazy(() => import("../pages/products/modifyPage"));

const Loading = () => <div>Products Loading....</div>;

export default function productsRouter() {
    return {
        path: "products",
        Component: ProductsIndex,
        children: [
            { path: "list", element: <Suspense fallback={<Loading />}><ProductsList /></Suspense> },
            { path: "add", element: <Suspense fallback={<Loading />}><ProductsAdd /></Suspense> },
            { path: "read/:pno", element: <Suspense fallback={<Loading />}><ProductRead /></Suspense> },
            { path: "modify/:pno", element: <Suspense fallback={<Loading />}><ProductModify /></Suspense> },
            { index: true, element: <Navigate to="/products/list" replace /> },
        ],
    };
}