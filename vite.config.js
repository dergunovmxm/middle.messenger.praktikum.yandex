import {resolve} from 'path'
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
	root: resolve(__dirname, 'src'),
	build: {
		outDir: resolve(__dirname, 'dist'),
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
				auth: resolve(__dirname, 'src/pages/Auth/index.html'),
				messenger: resolve(__dirname, 'src/pages/Messenger/index.html'),
				profile: resolve(__dirname, 'src/pages/Profile/index.html'),
				register: resolve(__dirname, 'src/pages/Register/index.html'),
				notFound: resolve(__dirname, 'src/pages/NotFound/index.html'),
				serverError: resolve(__dirname, 'src/pages/ServerError/index.html'),
			}
	}
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/partials'),
			context: {
				title: "TEST"
			}
		}),
	]
})
