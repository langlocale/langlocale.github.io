import LLList from "../js/ll-list.js"

const componentDefinitions = {
	"ll-list": LLList,
};

export function defineComponents(components = componentDefinitions) {
	Object.entries(components).map(([cTag, cDef]) => {
		if (!customElements.get(cTag)) {
			customElements.define(cTag, cDef);
		}
	});
}
defineComponents();

export default {
	componentDefinitions
}
