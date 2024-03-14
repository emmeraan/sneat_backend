export const PaginationHelper = {
  maximumlimit: 50,
  defaultlimit: 4,

  getPage: (page) => (!Number.isNaN(parseInt(page)) ? parseInt(page) : 1),
  getLimit: (limit: number): number => {
    return parseInt(
      limit
        ? limit > PaginationHelper.maximumlimit
          ? PaginationHelper.maximumlimit
          : limit
        : PaginationHelper.defaultlimit,
    );
  },
  getCustomPageOffset: (
    page: number,
    limit: number = PaginationHelper.defaultlimit,
  ): number => {
    return parseInt(
      (page
        ? page == 1
          ? 0
          : (page - 1) * PaginationHelper.getLimit(limit)
        : 0
      ).toString(),
    );
  },
  Paginate: (count, page, limit, items) => {
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : PaginationHelper.defaultlimit;
    count = parseInt(count);
    return {
      page: page,
      nextPage: count > page * limit ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      offset: limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      itemCount: items.length,
      items,
    };
  },
};
