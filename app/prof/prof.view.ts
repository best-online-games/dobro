namespace $.$$ {
	export class $bog_dobro_app_prof extends $.$bog_dobro_app_prof {
		// Development list
		@$mol_mem
		dev_titles(): readonly string[] {
			return [
				'Frontend Developer',
				'Backend Developer',
				'Full Stack Developer',
				'Mobile Developer',
				'QA Engineer',
				'Data Engineer',
				'ML Engineer',
			]
		}

		dev_title(id: number): string {
			return this.dev_titles()[id] ?? ''
		}

		@$mol_mem
		Dev_gallery_items() {
			return this.dev_titles().map((_, i) => this.Dev_item(i))
		}

		// Design list
		@$mol_mem
		design_titles(): readonly string[] {
			return ['UI/UX Designer', 'Product Designer', 'Graphic Designer', 'Motion Designer']
		}

		design_title(id: number): string {
			return this.design_titles()[id] ?? ''
		}

		@$mol_mem
		Design_gallery_items() {
			return this.design_titles().map((_, i) => this.Design_item(i))
		}

		// DevOps list
		@$mol_mem
		devops_titles(): readonly string[] {
			return ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer', 'Platform Engineer']
		}

		devops_title(id: number): string {
			return this.devops_titles()[id] ?? ''
		}

		@$mol_mem
		Devops_gallery_items() {
			return this.devops_titles().map((_, i) => this.Devops_item(i))
		}

		// All = union
		@$mol_mem
		all_titles(): readonly string[] {
			const all = [...this.dev_titles(), ...this.design_titles(), ...this.devops_titles()]
			// Deduplicate while preserving order
			return Array.from(new Set(all))
		}

		all_title(id: number): string {
			return this.all_titles()[id] ?? ''
		}

		@$mol_mem
		All_gallery_items() {
			return this.all_titles().map((_, i) => this.All_item(i))
		}

		// Link URIs to open Bot with seeded prompt
		All_item_uri(index: number) {
			return this.$.$mol_state_arg.link({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		Dev_item_uri(index: number) {
			return this.$.$mol_state_arg.link({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		Design_item_uri(index: number) {
			return this.$.$mol_state_arg.link({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		Devops_item_uri(index: number) {
			return this.$.$mol_state_arg.link({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		// Ensure bot starts fresh when opened from a card, set role, seed prompt and navigate
		@$mol_action
		All_item_open(index: number, event?: Event) {
			event?.preventDefault()
			const title = this.all_title(index)
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
			this.$.$mol_state_arg.go({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		@$mol_action
		Dev_item_open(index: number, event?: Event) {
			event?.preventDefault()
			const title = this.dev_title(index)
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
			this.$.$mol_state_arg.go({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		@$mol_action
		Design_item_open(index: number, event?: Event) {
			event?.preventDefault()
			const title = this.design_title(index)
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
			this.$.$mol_state_arg.go({ '': '\t', prompt: 'привет расскажи о себе' })
		}

		@$mol_action
		Devops_item_open(index: number, event?: Event) {
			event?.preventDefault()
			const title = this.devops_title(index)
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
			this.$.$mol_state_arg.go({ '': '\t', prompt: 'привет расскажи о себе' })
		}
	}
}
