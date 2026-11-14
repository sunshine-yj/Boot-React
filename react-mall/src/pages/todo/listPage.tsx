import ListComponent from "../../components/todo/listComponent";

function ListPage() {
    return (
        <div className="w-full bg-white p-4">
            <div className="text-3xl font-extrabold">Todo List Page</div>
            <ListComponent />
        </div>
    );
}

export default ListPage;