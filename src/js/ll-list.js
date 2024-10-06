/* Example to start with a fresh template */
export default class LLList extends HTMLElement {
	async connectedCallback() {
		this.model = this.getAttribute("model")
		const modelPath = new URL(import.meta.url).pathname.split('/').slice(0, -3).join('/')
		const data = await fetch(`${modelPath}/content/${this.model}.json`).then(data => data.json())
		this.data = data[this.model]
		this.render()
	}
	render() {
		const items = this.data.map(item => {
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
		this.replaceChildren(list)
	}
}

