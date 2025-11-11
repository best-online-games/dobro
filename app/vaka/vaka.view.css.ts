namespace $.$$ {
	$mol_style_define($bog_dobro_app_vaka, {
		flex: {
			grow: 1,
		},
		Tools: {
			padding: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.text,
		},
		Query: {
			flex: {
				grow: 1,
			},
			minWidth: '200px',
		},
		Area: {
			minWidth: '150px',
		},
		Results: {
			gap: $mol_gap.block,
			padding: $mol_gap.block,
		},
		Credits: {
			padding: $mol_gap.text,
			textAlign: 'center',
			opacity: 0.7,
		},
		Empty: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: $mol_gap.block,
			minHeight: '300px',
			gap: $mol_gap.block,
		},
		Empty_icon: {
			fontSize: '4rem',
			color: $mol_theme.shade,
			opacity: 0.5,
		},
		Empty_message: {
			textAlign: 'center',
			color: $mol_theme.shade,
			fontSize: '1.1rem',
			maxWidth: '500px',
			lineHeight: '1.6',
		},
	})

	$mol_style_define($bog_dobro_app_vaka_item, {
		display: 'flex',
		flexDirection: 'column',
		padding: $mol_gap.block,
		gap: $mol_gap.text,
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: '8px',
		},
		boxShadow: `0 2px 12px rgba(0, 0, 0, 0.08)`,
		transition: 'all 0.2s ease',
		':hover': {
			boxShadow: `0 4px 16px rgba(0, 0, 0, 0.12)`,
			transform: 'translateY(-2px)',
		},
		Title: {
			fontSize: '1.25rem',
			fontWeight: '600',
			textDecoration: 'none',
			lineHeight: '1.4',
			':hover': {
				textDecoration: 'underline',
			},
		},
		Meta: {
			fontSize: '0.9rem',
			lineHeight: '1.5',
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.5rem',
		},
		Salary: {
			fontWeight: '600',
			fontSize: '1.1rem',
			padding: [$mol_gap.text, 0] as any,
		},
		Snippet: {
			fontSize: '0.95rem',
			lineHeight: '1.6',
			whiteSpace: 'pre-wrap',
		},
	})
}
