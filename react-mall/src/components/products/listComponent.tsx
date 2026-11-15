import { imageUrl } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/pageComponent";

function ListComponent({ serverData }: { serverData: PageResponseDTO<ProductDTO> }) {
    const { moveToRead, moveToList } = useCustomMove();

    return (
        <div className="mx-2 mt-10 border-2 border-blue-100">
            <div className="grid grid-cols-1 gap-2 bg-white p-6 sm:grid-cols-2">
                {serverData.dtoList.map((product) => (
                    <div
                        key={product.pno}
                        className="cursor-pointer rounded border-2 border-gray-200 p-2 shadow-md hover:border-blue-300"
                        onClick={() => moveToRead(product.pno)}
                    >
                        <div className="p-2 text-2xl font-extrabold">{product.pno}</div>
                        <img
                            alt={product.pname}
                            className="m-auto w-60 rounded-md"
                            src={imageUrl(product.uploadFileNames[0], true)}
                        />
                        <div className="p-1 text-center font-extrabold">이름: {product.pname}</div>
                        <div className="p-1 text-center font-extrabold">가격: {product.price.toLocaleString()}원</div>
                    </div>
                ))}
            </div>

            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    );
}

export default ListComponent;