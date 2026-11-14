package org.zerock.mallapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.mallapi.domain.Product;
import org.zerock.mallapi.domain.ProductImage;
import org.zerock.mallapi.dto.PageRequestDTO;
import org.zerock.mallapi.dto.PageResponseDTO;
import org.zerock.mallapi.dto.ProductDTO;
import org.zerock.mallapi.repository.ProductRepository;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        Page<Object[]> result = productRepository.selectList(pageable);

        List<ProductDTO> dtoList = result.getContent().stream().map(arr -> {
            Product product = (Product) arr[0];
            ProductImage image = (ProductImage) arr[1];

            ProductDTO dto = ProductDTO.builder()
                    .pno(product.getPno())
                    .pname(product.getPname())
                    .pdesc(product.getPdesc())
                    .price(product.getPrice())
                    .build();
            dto.setUploadFileNames(List.of(image.getFileName()));
            return dto;
        }).toList();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    @Override
    public Long register(ProductDTO productDTO) {
        return productRepository.save(dtoToEntity(productDTO)).getPno();
    }

    @Override
    public ProductDTO get(Long pno) {
        Product product = productRepository.selectOne(pno).orElseThrow();
        return entityToDTO(product);
    }

    @Override
    public void modify(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getPno()).orElseThrow();

        product.changeName(productDTO.getPname());
        product.changeDesc(productDTO.getPdesc());
        product.changePrice(productDTO.getPrice());

        product.clearList();
        List<String> names = productDTO.getUploadFileNames();
        if (names != null) names.forEach(product::addImageString);

        productRepository.save(product);
    }

    @Override
    public void remove(Long pno) {
        productRepository.updateToDelete(pno, true);
    }

    private Product dtoToEntity(ProductDTO dto) {
        Product product = Product.builder()
                .pno(dto.getPno())
                .pname(dto.getPname())
                .pdesc(dto.getPdesc())
                .price(dto.getPrice())
                .build();

        List<String> names = dto.getUploadFileNames();
        if (names != null) names.forEach(product::addImageString);
        return product;
    }

    private ProductDTO entityToDTO(Product product) {
        ProductDTO dto = ProductDTO.builder()
                .pno(product.getPno())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .price(product.getPrice())
                .delFlag(product.isDelFlag())
                .build();

        List<String> names = product.getImageList().stream()
                .map(ProductImage::getFileName)
                .toList();
        dto.setUploadFileNames(names);
        return dto;
    }
}
