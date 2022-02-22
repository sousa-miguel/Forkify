import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateBtnMarkupNext(page) {
    return `
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateBtnMarkupPrev(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
    `;
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateBtnMarkupNext(currPage);
    }

    // last page
    if (currPage === numPages && numPages > 1) {
      return this._generateBtnMarkupPrev(currPage);
    }
    // other page

    if (currPage < numPages) {
      return `
        ${this._generateBtnMarkupPrev(currPage)}
        ${this._generateBtnMarkupNext(currPage)}
      `;
    }

    // page, and there are NO other pages
    return '';
  }
}

export default new paginationView();
