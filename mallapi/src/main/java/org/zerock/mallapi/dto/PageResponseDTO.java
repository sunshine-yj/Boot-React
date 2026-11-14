package org.zerock.mallapi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {

    private List<E> dtoList;
    private List<Integer> pageNumList;
    private PageRequestDTO pageRequestDTO;
    private boolean prev, next;
    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) totalCount;

        int page = pageRequestDTO.getPage();
        int size = pageRequestDTO.getSize();

        int blockEnd = (int) Math.ceil(page / 10.0) * 10;
        int blockStart = blockEnd - 9;
        int lastPage = (int) Math.ceil(totalCount / (double) size);
        int end = Math.min(blockEnd, lastPage);

        this.prev = blockStart > 1;
        this.next = totalCount > (long) end * size;
        this.pageNumList = IntStream.rangeClosed(blockStart, end).boxed().toList();
        if (prev) this.prevPage = blockStart - 1;
        if (next) this.nextPage = end + 1;

        this.totalPage = pageNumList.size();
        this.current = page;
    }
}