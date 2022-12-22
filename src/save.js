import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, subtitle } = attributes;
	return (
		<div { ...useBlockProps.save() }>
			<RichText.Content tagName="h2" value={ title } />
			<RichText.Content tagName="h3" value={ subtitle } />
			<div className="ob-user-container">
				<div className="ob-user-grid-filters"></div>
				<div className="ob-user-grid">
					<InnerBlocks.Content />
				</div>

				<div className="ob-user-nav ob-user-nav-next">
					<div className="arrow"></div>
				</div>
				<div className="ob-user-nav ob-user-nav-prev">
					<div className="arrow"></div>
				</div>
			</div>
		</div>
	);
}
