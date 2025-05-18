# Glimmer Package

A Vue 3 design system component library.

## Installation

This is a private package that requires authentication. Follow these steps carefully:

1. **Request Access**:
   - Ensure you have been granted access to the repository
   - Contact the repository administrators if you need access

2. **Create a Personal Access Token**:
   - Go to GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens
   - Click "Generate new token"
   - Set the token name (e.g., "Glimmer Package Access")
   - Set expiration as needed
   - Select the repository under "Repository access"
   - Enable the following permissions:
     - `read:packages` (Required for installation)
     - `repo` (Required for private repository access)
   - Save the token securely

3. **Configure Authentication**:
   Create or edit `~/.npmrc`:
   ```
   @laurensvantour:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```
   
   Or configure it for this project only by creating `.npmrc` in your project root:
   ```
   @laurensvantour:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

4. **Install the package**:
   ```bash
   # Using npm
   npm install @laurensvantour/glimmer-package

   # Using yarn (make sure you've configured .npmrc first)
   yarn add @laurensvantour/glimmer-package
   ```

   Or add to your package.json:
   ```json
   {
     "dependencies": {
       "@laurensvantour/glimmer-package": "github:laurensvantour/glimmer-package#v1.0.0"
     }
   }
   ```

## Usage

```vue
import { ComponentName } from '@laurensvantour/glimmer-package'
import '@laurensvantour/glimmer-package/style.css'
```

## Development

1. Clone the repository (requires repository access)
2. Install dependencies: `npm install`
3. Start Storybook: `npm run storybook`
4. Build the library: `npm run build`

## Security Notes

- Never commit your GitHub token or .npmrc file containing the token
- Use environment variables in CI/CD pipelines
- Regularly rotate your access tokens
- Report security vulnerabilities to the repository administrators

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Note: Despite the MIT license, this is a private package and requires explicit access permission.
