namespace $.$$ {
	export class $bog_dobro_app_charity extends $.$bog_dobro_app_charity {
		@$mol_mem
		charity_titles(): readonly string[] {
			return [
				'Поддержать пожилого соседа',
				'Сделать донорство крови',
				'Помочь приюту для животных',
				'Купить продукты малообеспеченной семье',
				'Участие в субботнике во дворе',
			]
		}

		@$mol_mem
		charity_descriptions(): readonly string[] {
			return [
				'Спросить, нужна ли помощь с покупками, лекарствами или прогулкой.',
				'Записаться в ближайший пункт сдачи крови и прийти вовремя.',
				'Отнести корм, лекарства или помочь с выгулом животных.',
				'Собрать базовый набор продуктов и передать через волонтёров.',
				'Присоединиться к уборке двора или парка вместе с соседями.',
			]
		}

		@$mol_mem
		charity_rows() {
			return this.charity_titles().map((_, index) => {
				const row = new this.$.$bog_dobro_app_charity_row()
				row.title = () => this.charity_titles()[index] ?? ''
				row.description = () => this.charity_descriptions()[index] ?? ''
				return row
			})
		}
	}
}

