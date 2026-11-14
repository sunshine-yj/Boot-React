import { lazy, Suspense } from "react";

const TodoIndex = lazy(() => import("../pages/todo/indexPage"));
const TodoList = lazy(() => import("../pages/todo/listPage"));
const TodoRead = lazy(() => import("../pages/todo/readPage"));
const Loading = () => <div>Todo Loading....</div>;

export default function todoRouter() {
    return {
        path: "todo",
        Component: TodoIndex,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading />}><TodoList /></Suspense>,
            },
            {
                path: "read/:tno",
                element: <Suspense fallback={<Loading />}><TodoRead /></Suspense>,
            },
        ],
    };
}