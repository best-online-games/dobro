namespace $.$$ {
	// Интерфейсы для типизации ответов API HH.ru
	interface HHVacancy {
		id: string
		name: string
		alternate_url: string
		salary: {
			from: number | null
			to: number | null
			currency: string
			gross?: boolean
		} | null
		employer: {
			name: string
			alternate_url?: string
		}
		area: {
			name: string
		}
		snippet: {
			requirement: string | null
			responsibility: string | null
		} | null
		published_at: string
		schedule?: {
			name: string
		}
		experience?: {
			name: string
		}
	}

	interface HHSearchResponse {
		items: HHVacancy[]
		found: number
		pages: number
		page: number
		per_page: number
	}

	// Маппинг названий регионов на их ID в API HH.ru
	const AREA_MAP: Record<string, string> = {
		Россия: '113',
		Москва: '1',
		'Санкт-Петербург': '2',
	}

	export class $bog_dobro_app_vaka extends $.$bog_dobro_app_vaka {
		// Текущий поисковый запрос
		@$mol_mem
		query(next?: string): string {
			return next ?? 'программист'
		}

		// Выбранный регион
		@$mol_mem
		area_name(next?: string): string {
			return next ?? 'Россия'
		}

		// Получение ID региона для API
		@$mol_mem
		area_id(): string {
			return AREA_MAP[this.area_name()] ?? '113'
		}

		// Статус загрузки
		@$mol_mem
		loading_status(next?: any): any {
			return next ?? null
		}

		// Триггер для принудительного обновления
		@$mol_mem
		update_trigger(next?: number): number {
			return next ?? 0
		}

		search(next?: any): any {
			if (next !== undefined) {
				// Увеличиваем счётчик для обновления
				this.update_trigger(this.update_trigger() + 1)
			}
			return next
		}

		// Получение данных о вакансиях с API
		// Service Worker автоматически кэширует GET запросы через $mol_offline
		@$mol_mem
		vacancies_data(): HHSearchResponse | null {
			// Подписываемся на триггер обновления
			this.update_trigger()

			const query = this.query()
			const area = this.area_id()

			// Если запрос пустой, не делаем запрос
			if (!query || !query.trim()) {
				return { items: [], found: 0, pages: 0, page: 0, per_page: 0 }
			}

			// Формируем URL для запроса
			const params = new URLSearchParams({
				text: query.trim(),
				area: area,
				per_page: '50',
				page: '0',
			})

			const url = `https://api.hh.ru/vacancies?${params.toString()}`

			try {
				this.loading_status('⏳ Загрузка...')

				console.log('🔍 [FETCH] Запрос вакансий:', {
					url,
					query: query.trim(),
					area: this.area_name(),
					cache: 'force-cache',
					timestamp: new Date().toISOString(),
				})

				const startTime = performance.now()

				// Используем force-cache для кеширования GET запросов в HTTP-кеше браузера
				const response = this.$.$mol_fetch.json(url, {
					cache: 'force-cache',
				}) as HHSearchResponse

				const endTime = performance.now()
				const duration = Math.round(endTime - startTime)

				console.log('✅ [CACHE] Получен ответ:', {
					items: response.items.length,
					found: response.found,
					duration: `${duration}ms`,
					source: duration < 50 ? '💾 from cache' : '🌐 from network',
					timestamp: new Date().toISOString(),
				})

				this.loading_status(null)

				return response
			} catch (error) {
				// Игнорируем ошибки при отмене запроса
				if (error && typeof error === 'object' && 'message' in error) {
					const errMsg = (error as any).message || ''
					if (!errMsg.includes('aborted')) {
						console.error('❌ [FETCH] Ошибка загрузки с API:', {
							url,
							query: query.trim(),
							error: errMsg,
							timestamp: new Date().toISOString(),
						})
					}
				}
				this.loading_status(null)
				return { items: [], found: 0, pages: 0, page: 0, per_page: 0 }
			}
		}

		// Список ID вакансий для отображения
		@$mol_mem
		vacancy_ids(): string[] {
			try {
				const data = this.vacancies_data()
				if (!data || !data.items) return []
				return data.items.map(v => v.id)
			} catch (error) {
				console.error('❌ Ошибка при загрузке вакансий:', error)
				return []
			}
		}

		// Получение конкретной вакансии по ID
		@$mol_mem_key
		vacancy(id: string): HHVacancy | null {
			try {
				const data = this.vacancies_data()
				if (!data || !data.items) return null
				return data.items.find(v => v.id === id) ?? null
			} catch (error) {
				console.error('❌ Ошибка при получении вакансии:', error)
				return null
			}
		}

		// Генерация строк для отображения в списке
		@$mol_mem
		vacancy_rows(): readonly any[] {
			const ids = this.vacancy_ids()
			return ids.map(id => this.Row(id))
		}

		// Переопределяем Row для передачи данных вакансии
		@$mol_mem_key
		Row(id: string) {
			const row = new this.$.$bog_dobro_app_vaka_item()
			row.vacancy = () => this.vacancy(id)
			return row
		}

		// Сообщение для пустого состояния
		@$mol_mem
		empty_message(): string {
			const data = this.vacancies_data()
			const query = this.query()

			if (!query || !query.trim()) {
				return '👋 Введите поисковый запрос и нажмите "Найти" для поиска вакансий'
			}

			if (!data || data.items.length === 0) {
				return `😔 По запросу "${query}" ничего не найдено. Попробуйте изменить запрос или выбрать другой регион.`
			}

			return ''
		}

		// Статистика поиска
		@$mol_mem
		stats_message(): string {
			const data = this.vacancies_data()
			if (!data || data.items.length === 0) return ''

			return `📊 Найдено: ${data.found.toLocaleString('ru-RU')} • Показано: ${data.items.length}`
		}
	}
}
