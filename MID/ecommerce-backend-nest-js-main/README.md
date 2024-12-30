<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

  <h1>E-Commerce (Kinbo-naki?) Backend</h1>
  <h1>Project Setup</h1>

  <p>To get started with this project, follow the steps below:</p>

  <h2>Install Dependencies</h2>
  <pre><code>npm install</code></pre>

  <h2>Compile and Run the Project</h2>

  <h3>Development Mode</h3>
  <pre><code>npm run start</code></pre>

  <h3>Watch Mode</h3>
  <pre><code>npm run start:dev</code></pre>

  <h3>Production Mode</h3>
  <pre><code>npm run start:prod</code></pre>

  <h2>Run Tests</h2>

  <h3>Unit Tests</h3>
  <pre><code>npm run test</code></pre>

  <h3>End-to-End (E2E) Tests</h3>
  <pre><code>npm run test:e2e</code></pre>

  <h3>Test Coverage</h3>
  <pre><code>npm run test:cov</code></pre>

  <hr>

  <h1>Deployment</h1>

  <h2>Preparing for Production</h2>
  <p>To deploy your NestJS application for production, follow the guidelines in the <a href="https://docs.nestjs.com/deployment">NestJS Deployment Documentation</a>.</p>

  <h2>Deploying with Mau</h2>
  <p>Mau is the official cloud-based platform for deploying NestJS applications on AWS. It simplifies the deployment process, enabling you to deploy your application quickly and efficiently.</p>

  <h3>Install Mau</h3>
  <pre><code>npm install -g mau</code></pre>

  <h3>Deploy with Mau</h3>
  <pre><code>mau deploy</code></pre>

  <p>For more information, visit <a href="https://mau.nestjs.com">Mau</a>.</p>

  <hr>

  <h1>Resolving Linebreak Style Issues (LF vs. CRLF)</h1>

  <p>If you encounter the error <code>Expected linebreaks to be 'LF' but found 'CRLF'</code>, follow these steps:</p>

  <h2>Step 1: Update ESLint Configuration</h2>
  <p>Ensure your ESLint configuration enforces <code>LF</code> line endings.</p>
  <pre><code>rules: {
  'linebreak-style': ['error', 'unix'], // Enforces LF line endings
},</code></pre>

  <h2>Step 2: Update Prettier Configuration</h2>
  <p>Set <code>endOfLine</code> to <code>lf</code> in your Prettier configuration file (<code>.prettierrc</code>):</p>
  <pre><code>{
  "endOfLine": "lf"
}</code></pre>

  <h2>Step 3: Install Prettier and ESLint Integration</h2>
  <p>Install the necessary plugins to integrate Prettier and ESLint:</p>
  <pre><code>npm install --save-dev eslint-config-prettier eslint-plugin-prettier</code></pre>

  <h2>Step 4: Reformat Files with Prettier</h2>
  <p>Run Prettier to reformat all files and apply the correct line endings:</p>
  <pre><code>npx prettier --write .</code></pre>

  <hr>

  <p>Following these steps ensures consistent line endings and resolves any linebreak style issues.</p>

  <h1>Do Add DataBase To Your PG-ADMIN4 Follow below command</h1>
  <pre><code>npm run migration:generate -- DB/migrations/addTBL_orders_3_table_updated</code></pre>
  <p>After that write this code</p>
   <pre><code>npm run migration:run </code></pre>
</body>
</html>
