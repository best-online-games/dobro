namespace $.$$ {
	export class $bog_dobro_app extends $.$bog_dobro_app {
		// Override child property via code instead of view.tree binding
		override Bot() {
			const obj = super.Bot()
			;(obj as any).context = () => this.Bot_context()
			return obj
		}

		// Compute extended system prompt for bot
		Bot_context() {
			const base = this.Bot().rules()
			const prof = this.$.$mol_state_session.value('gd_profession') as string | null
			return prof
				? `${base}\nТы сейчас отвечаешь как ${prof}. Если пользователь поздоровается и попросит рассказать о себе, ответь и распиши типичный день человека на этой професии : \"я ${prof}\ ".`
				: base
		}
	}
}
