package org.zerock.mallapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.zerock.mallapi.domain.*;
import org.zerock.mallapi.dto.CartItemDTO;
import org.zerock.mallapi.dto.CartItemListDTO;
import org.zerock.mallapi.repository.CartItemRepository;
import org.zerock.mallapi.repository.CartRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO dto) {
        String email = dto.getEmail();

        if (dto.getCino() != null) {
            CartItem item = cartItemRepository.findById(dto.getCino()).orElseThrow();
            item.changeQty(dto.getQty());
            cartItemRepository.save(item);
            return getCartItems(email);
        }

        Cart cart = getCart(email);
        CartItem item = cartItemRepository.getItemOfPno(email, dto.getPno());

        if (item == null) {
            item = CartItem.builder()
                    .product(Product.builder().pno(dto.getPno()).build())
                    .cart(cart)
                    .qty(dto.getQty())
                    .build();
        } else {
            item.changeQty(dto.getQty());
        }
        cartItemRepository.save(item);
        return getCartItems(email);
    }

    private Cart getCart(String email) {
        return cartRepository.getCartOfMember(email).orElseGet(() -> {
            log.info("cart of {} not exist → create", email);
            Cart newCart = Cart.builder().owner(Member.builder().email(email).build()).build();
            return cartRepository.save(newCart);
        });
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {
        Long cno = cartItemRepository.getCartFromItem(cino);
        cartItemRepository.deleteById(cino);
        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}