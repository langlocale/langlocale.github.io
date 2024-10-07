import { Languages } from "./data.js"

/* Example to start with a fresh template */
export default class LLList extends HTMLElement {
	static get observedAttributes() {
		return ["language"]
	}
	get language() {
		return this.getAttribute("language") || Languages[0]
	}
	set language(str) {
		this.setAttribute("language", str)
	}

	attributeChangedCallback() {
		this.render()
	}

	async connectedCallback() {
		this.model = this.getAttribute("model")
		const modelPath = new URL(import.meta.url).pathname.split('/').slice(0, -3).join('/')
		const data = await fetch(`${modelPath}/content/${this.model}.json`).then(data => data.json())
		this.data = data[this.model]
		this.render()
	}
	render() {
		const items = this.data.filter(item => {
			return item.language === this.language
		}).map(item => {
			const wrapper = document.createElement("article")
			const link = document.createElement("a")
			link.textContent = item.name
			link.href = item.url
			link.setAttribute("target", "_blank")

			const lang = document.createElement("span")
			lang.textContent = item.language

			wrapper.append(link, lang)
			return wrapper
		})

		const list = document.createElement("ul")
		list.replaceChildren(...items.map(item => {
			const li = document.createElement("li")
			li.append(item)
			return li
		}))

		const options = Languages.map((option) => {
			const $option = document.createElement("option")
			$option.textContent = option
			$option.value = option
			if (option === this.language) {
				$option.selected = true
			}
			return $option
		})

		const select = document.createElement("select")
		select.addEventListener("change", (event) => {
			this.setAttribute("language", event.target.value)
		})
		select.replaceChildren(...options)
		this.replaceChildren(select, list)
	}
}

