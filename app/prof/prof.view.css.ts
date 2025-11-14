namespace $.$$ {
	$mol_style_define($bog_dobro_app_prof, {
		Helper_item: {
			padding: $mol_gap.block,
			flex: {
				grow: 1,
				shrink: 1,
				basis: '18rem',
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
			background: {
				color: $mol_theme.card,
			},
			gap: $mol_gap.space,
			cursor: 'pointer',
			transition: 'transform 0.3s ease, box-shadow 0.3s ease',
			':hover': {
				transform: 'translateY(-8px)',
				boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
			},
		},
	})
}
