namespace $.$$ {
	export class $bog_dobro_app_prof extends $.$bog_dobro_app_prof {
		@$mol_mem
		query(next?: string): string {
			return next ?? ''
		}

		// Helpers list
		@$mol_mem
		helper_titles(): readonly string[] {
			return ['Личный юрист', 'Личный бухгалтер', 'Финансовый консультант', 'Карьерный коуч']
		}

		helper_title(id: number): string {
			return this.helper_titles()[id] ?? ''
		}

		@$mol_mem
		helper_descriptions(): readonly string[] {
			return [
				'Поможет с договорами, спорами и правами.',
				'Разберётся с налогами, отчётами и бюджетом.',
				'Поддержит в вопросах инвестиций и планирования.',
				'Поможет спланировать карьеру и рост в профессии.',
			]
		}

		helper_description(id: number): string {
			return this.helper_descriptions()[id] ?? ''
		}

		@$mol_mem
		Helpers_gallery_items() {
			const query = this.query().toLowerCase().trim()
			const titles = this.helper_titles()

			const indices = titles
				.map((title, index) => ({ title, index }))
				.filter(item => !query || item.title.toLowerCase().includes(query))
				.map(item => item.index)

			return indices.map(i => this.Helper_item(i))
		}


		@$mol_action
		Helper_item_open(index: number, event?: Event) {
			event?.preventDefault()
			const title = this.helper_title(index)
			try {
				this.$.$mol_state_session?.value('history', null as any)
			} catch {}
			try {
				this.$.$mol_state_session?.value('title', null as any)
			} catch {}
			try {
				this.$.$mol_state_session?.value('digest', '')
			} catch {}
			try {
				this.$.$mol_state_session?.value('gd_profession', title)
			} catch {}
			this.$.$mol_state_arg.go({
				'': '\t',
				prompt: 'привет',
			})
		}
	}
}
