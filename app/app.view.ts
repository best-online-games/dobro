namespace $.$$ {
	export class $bog_dobro_app extends $.$bog_dobro_app {
		override Bot() {
			const obj = super.Bot()
			;(obj as any).context = () => this.Bot_context()
			return obj
		}

		Bot_context() {
			const base = this.Bot().rules()
			const prof = this.$.$mol_state_session.value('gd_profession') as string | null
			return prof
				? `${base}\nТы сейчас отвечаешь как ${prof}. Если пользователь поздоровается и попросит рассказать о себе, опиши, чем ты можешь помочь людям в этой роли, и приведи три типичных вопроса, которые тебе обычно задают.`
				: base
		}

		override Ainews() {
			const app = super.Ainews()

			const feed = app.Feed?.()
			if (feed && feed.Welcome_block_p2_paragraph) {
				const orig = feed.Welcome_block_p2_paragraph.bind(feed)
				feed.Welcome_block_p2_paragraph = () => {
					const link = orig()
					link.uri = () => '#!=ainews/null=sources'
					return link
				}
			}

			return app
		}
	}
}
