namespace $.$$ {
	export class $bog_dobro_app_vaka_item extends $.$bog_dobro_app_vaka_item {
		// Данные вакансии передаются извне
		vacancy(next?: any): any {
			return next ?? null
		}

		// Название вакансии
		@$mol_mem
		title(): string {
			const vacancy = this.vacancy()
			return vacancy?.name ?? 'Без названия'
		}

		// Ссылка на вакансию (используем alternate_url)
		@$mol_mem
		url(): string {
			const vacancy = this.vacancy()
			return vacancy?.alternate_url ?? '#'
		}

		// Метаинформация (работодатель, регион, опыт, график)
		@$mol_mem
		meta(): string {
			const vacancy = this.vacancy()
			if (!vacancy) return ''

			const parts: string[] = []

			// Работодатель
			if (vacancy.employer?.name) {
				parts.push(`🏢 ${vacancy.employer.name}`)
			}

			// Регион
			if (vacancy.area?.name) {
				parts.push(`📍 ${vacancy.area.name}`)
			}

			// Опыт работы
			if (vacancy.experience?.name) {
				parts.push(`💼 ${vacancy.experience.name}`)
			}

			// График работы
			if (vacancy.schedule?.name) {
				parts.push(`⏰ ${vacancy.schedule.name}`)
			}

			return parts.join(' • ')
		}

		// Зарплата
		@$mol_mem
		salary(): string {
			const vacancy = this.vacancy()
			if (!vacancy?.salary) return '💰 Зарплата не указана'

			const { from, to, currency, gross } = vacancy.salary
			const curr = this.currency_symbol(currency)
			const taxInfo = gross ? ' (до вычета налогов)' : ''

			if (from && to) {
				return `💰 ${from.toLocaleString('ru-RU')} - ${to.toLocaleString('ru-RU')} ${curr}${taxInfo}`
			} else if (from) {
				return `💰 от ${from.toLocaleString('ru-RU')} ${curr}${taxInfo}`
			} else if (to) {
				return `💰 до ${to.toLocaleString('ru-RU')} ${curr}${taxInfo}`
			}

			return '💰 Зарплата не указана'
		}

		// Преобразование кода валюты в символ
		currency_symbol(code: string): string {
			const symbols: Record<string, string> = {
				RUR: '₽',
				RUB: '₽',
				USD: '$',
				EUR: '€',
				KZT: '₸',
				UAH: '₴',
				BYR: 'Br',
				BYN: 'Br',
				AZN: '₼',
				UZS: 'сўм',
				GEL: '₾',
			}
			return symbols[code] ?? code
		}

		// Описание вакансии (snippet)
		@$mol_mem
		snippet(): string {
			const vacancy = this.vacancy()
			if (!vacancy?.snippet) return ''

			const parts: string[] = []

			if (vacancy.snippet.requirement) {
				const req = this.clean_html(vacancy.snippet.requirement)
				if (req) {
					parts.push(`📋 Требования:\n${req}`)
				}
			}

			if (vacancy.snippet.responsibility) {
				const resp = this.clean_html(vacancy.snippet.responsibility)
				if (resp) {
					parts.push(`✅ Обязанности:\n${resp}`)
				}
			}

			return parts.join('\n\n')
		}

		// Очистка HTML-тегов из текста и форматирование
		clean_html(text: string): string {
			if (!text) return ''

			return (
				text
					// Заменяем highlighttext на жирный текст
					.replace(/<highlighttext>/gi, '**')
					.replace(/<\/highlighttext>/gi, '**')
					// Удаляем все остальные HTML теги
					.replace(/<[^>]+>/g, '')
					// Декодируем HTML entities
					.replace(/&nbsp;/g, ' ')
					.replace(/&quot;/g, '"')
					.replace(/&amp;/g, '&')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					// Убираем лишние пробелы
					.replace(/\s+/g, ' ')
					.trim()
			)
		}
	}
}
