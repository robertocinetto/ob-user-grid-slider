// DOM elements selection
const filtersContainer = document.querySelector( '.ob-user-grid-filters' );
const usersContainer = document.querySelector( '.ob-user-grid' );
const arrowNext = document.querySelector( '.ob-user-nav-next' );
const arrowPrev = document.querySelector( '.ob-user-nav-prev' );
arrowPrev.classList.add( 'hide' ); //hide the prev arrow

const categoriesNodeList = document.querySelectorAll( 'h4[data-category]' );
const obUserElem = document.querySelectorAll( '.ob-user-grid-elem' );
const categories = [];

//populate the categories array for filter menu manipulation
categoriesNodeList.forEach( ( category ) => {
	if ( category.textContent === '' ) {
		category.textContent = 'UNCATEGORIZED';
		category.dataset.category = 'UNCATEGORIZED';
	}
	categories.push( category.textContent );
} );

const cleanCategories = [ 'ALL', ...new Set( categories ) ];

/*
 * checkOverflow function: a function checking if the users are enough to overflow and needs to scroll
 */
const checkOverflow = ( el ) => {
	const isOverflowing =
		el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
	return isOverflowing;
};
// if the users grid need to scroll the next arrow is showed
if ( checkOverflow( usersContainer ) === false ) {
	arrowNext.classList.add( 'hide' );
} else {
	arrowNext.classList.remove( 'hide' );
}

/*
 * Filter users function
 */
const filterUsers = ( e ) => {
	//select all the filters and remove the active class if it is present
	document
		.querySelectorAll( '.ob-user-grid-filters > button' )
		.forEach( ( btn ) => btn.classList.remove( 'active' ) );

	// set the clicked filter as ACTIVE
	e.target.classList.add( 'active' );

	// if previously hidden, show all the users in the grid
	obUserElem.forEach( ( item ) => item.classList.remove( 'hide' ) );

	if ( e.target.dataset.category !== 'ALL' ) {
		// if the clicked filter is not ALL

		// select al the users that do not have the dataset category
		const obUserElemFiltered = document.querySelectorAll(
			`.ob-user-grid-elem:not(:has([data-category="${ e.target.dataset.category }"]))`
		);

		// all the selected items are hidden
		obUserElemFiltered.forEach( ( item ) => {
			item.classList.add( 'closing' );

			// after the animation ending, remove the element from the grid
			item.addEventListener(
				'animationend',
				() => {
					item.classList.add( 'hide' );
					item.classList.remove( 'closing' );

					// check if after the removal caused by the applied filter the arrow is still needed
					if ( checkOverflow( usersContainer ) === false ) {
						arrowNext.classList.add( 'hide' );
						arrowPrev.classList.add( 'hide' );
					} else {
						arrowNext.classList.remove( 'hide' );
					}
				},
				{ once: true }
			);
		} );
	} else {
		arrowNext.classList.remove( 'hide' );
	}
};

/*
 * Create filter buttons: creates all the filter buttons and attaches an click event listener
 */
cleanCategories.forEach( ( category ) => {
	const catBtn = document.createElement( 'button' );
	catBtn.innerText = category;
	catBtn.classList = `category-btn ${ category }`;
	catBtn.dataset.category = category;
	if ( category === 'ALL' ) catBtn.classList.add( 'active' );
	filtersContainer.append( catBtn );
	catBtn.addEventListener( 'click', filterUsers );
} );

/*
 * User grid navigation functionality
 */

// NEXT
arrowNext.addEventListener( 'click', () => {
	const userElem = document.querySelectorAll(
		'.ob-user-grid-elem:not(.hide)'
	);
	usersContainer.scrollTo( {
		left: usersContainer.scrollLeft + userElem[ 0 ].offsetWidth + 1,
		behavior: 'smooth',
	} );

	arrowPrev.classList.remove( 'hide' );

	if (
		usersContainer.offsetWidth + usersContainer.scrollLeft + 5 >=
		usersContainer.scrollWidth
	)
		arrowNext.classList.add( 'hide' );
} );

// PREV
arrowPrev.addEventListener( 'click', () => {
	const userElem = document.querySelectorAll(
		'.ob-user-grid-elem:not(.hide)'
	);
	usersContainer.scrollTo( {
		left: usersContainer.scrollLeft - userElem[ 0 ].offsetWidth - 10,
		behavior: 'smooth',
	} );

	arrowNext.classList.remove( 'hide' );

	if ( usersContainer.scrollLeft === 0 ) arrowPrev.classList.add( 'hide' );
} );

// ON MOUSE AND MOBILE SCROLL
usersContainer.addEventListener( 'scroll', () => {
	if (
		usersContainer.offsetWidth + usersContainer.scrollLeft >=
		usersContainer.scrollWidth
	) {
		arrowNext.classList.add( 'hide' );
		arrowPrev.classList.remove( 'hide' );
	} else if ( usersContainer.scrollLeft === 0 ) {
		arrowPrev.classList.add( 'hide' );
		arrowNext.classList.remove( 'hide' );
	}
} );
