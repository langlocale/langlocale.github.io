import {Languages} from "../data.js"


export default {
	load_config_file: false,

	/* For local CMS, toggle next line and `npx decap-server` */
	local_backend: true,
	backend: {
		name: 'test-repo',
	},

	/** Media uploads */
	media_folder: 'uploads',
	collections: [
		{
			label: 'Content',
			name: 'content',
			files: [
				{
					label: 'TV Channels',
					name: 'tv-channels',
					file: 'content/tv-channels.json',
					fields: [
						{
							label: 'TV Channel',
							name: 'tv-channels',
							widget: 'list',
							fields: [
								{
									label: "Name",
									name: "name",
									widget: "string"
								},
								{
									label: "URL",
									name: "url",
									widget: "string"
								},
								{
									label: "Language",
									name: "language",
									widget: "select",
									options: Languages
								},
							]
						}
					]
				},
			]
		},
		/* {
			label: 'Languages',
			label_singular: 'Language',
			name: 'language',
			folder: 'content/languages',
			format: "json",
			slug: '{{name}}',
			create: true,
			fields: [
				{
					label: 'Name',
					name: 'name',
					widget: 'string',
					hint: 'The name of this language',
					required: true,
					pattern: ['^[a-z]+$', 'This field must be only text and cannot have spaces. Only use "a" to "z" in lowercase']
				}
			]
		} */
	]
}
