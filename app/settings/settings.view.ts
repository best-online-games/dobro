namespace $.$$ {
	export class $bog_dobro_app_settings extends $.$bog_dobro_app_settings {
		private deferredPrompt: any = null

		override auto() {
			super.auto()

			if (typeof window === 'undefined') return

			window.addEventListener('beforeinstallprompt', event => {
				event.preventDefault()
				this.deferredPrompt = event
			})

			window.addEventListener('appinstalled', () => {
				this.deferredPrompt = null
			})
		}

		@$mol_action
		install() {
			if (typeof window === 'undefined') return

			if (this.deferredPrompt) {
				const promptEvent = this.deferredPrompt
				promptEvent.prompt()

				const choice = promptEvent.userChoice
				if (choice?.finally) {
					choice.finally(() => {
						this.deferredPrompt = null
					})
				} else if (choice?.then) {
					choice
						.then(() => {
							this.deferredPrompt = null
						})
						.catch(() => {
							this.deferredPrompt = null
						})
				} else {
					this.deferredPrompt = null
				}

				return
			}

			const isStandalone =
				window.matchMedia?.('(display-mode: standalone)')?.matches || (navigator as any).standalone

			if (isStandalone) {
				alert(this.install_already_installed())
				return
			}

			const userAgent = navigator.userAgent

			if (/iPad|iPhone|iPod/.test(userAgent)) {
				alert(this.install_ios_instruction())
				return
			}

			if (/Android/.test(userAgent)) {
				alert(this.install_android_instruction())
				return
			}

			if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
				alert(this.install_desktop_instruction())
				return
			}

			alert(this.install_unsupported_browser())
		}
	}
}
