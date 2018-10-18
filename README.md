Cross Framework Angular elements

After release of Angular 6, we can bootstrap Angular components within an existing Angular application by registering them as Custom Elements. That means we can use angular component as cross platform component that can be used with other js frameworks or even with vanilla javascript.
We will create <highlight-me></highlight-me> angular component to highlight certain part of the string with different color. It may not be a usual use case in day to day app development, however it'll help to demonstrate how to get started with Angular element.

Custom Web components:
MDN definition of web component is
Web Components is a suite of different technologies allowing you to create reusable custom elements - with their functionality encapsulated away from the rest of your code - and utilize them in your web apps.
You can also refer to the links https://alligator.io/web-components/your-first-custom-element/ for more information on custom elements and shadow Dom
It's always a good practice to reuse code as much as possible, and using angular element we are going to achieve exactly the same.
Setup :
First you'll want to make sure you have latest Angular CLI ( >6.0.0 ) installed. If not follow below steps :
npm uninstall -g @angular/cli // Uninstall existing CLI
npm install -g @angular/cli@latest // Install latest CLI
Create a new angular project
ng new angular-element-demo
Adding @angular/elements library
We need to add polyfills so that angular elements can work as custom element outside of angular app or in vanilla javascript and in all browser.
For this purpose, Angular 6 has released Angular library called @angular/elements. Angular CLI has introduced `ng add <package>` command which uses package manager (npm or yarn) to download the dependencies and update your project configuration.
Add @angular/elements using below command:
ng add @angular/elements
This package exports us useful method 'createCustomElement' which takes component class as its argument and config options such as Injector to return an implementation for custom element
this will also update your angular.json and you can see `node_modules/document-register-element/build/document-register-element.js` getting added to scripts section of your root project.
Create Angular component:
ng g c highlight-text –v Native
this will create the highlight-text component with view encapsulation to Native. It creates custom elements with Shadow Dom where browsers native implementation ensures styles will be scoped to that particular component only. Read more on this https://alligator.io/angular/viewencapsulation/
Our Component code looks like this :

<script src="https://gist.github.com/rahul-naik/52e98127785f06a1c43a1bd4ad98c17b.js"></script>

And template looks like this :

<script src="https://gist.github.com/rahul-naik/3fd888a4ed8fdb1b4e5170f69473207d.js"></script>

We have used decorator named @Input to get the color value which we will pass to the custom element and binded this value in template in `ngStyle` to highlight the selected text with the color passed.
We have used `ng-content` tag to ensure the content projection so that whatever text we include in our custom element will get projected inside `ng-content` . Read more on content projection here: https://alligator.io/angular/content-projection-angular/
So we are done with our custom element.
Registering component :
Register the component in declaration array and entryComponents Array.
Note : Remember as our HighlightTextComponent is not added in any template inside out angular app so we need to add it in entrycomponents to tell angular to compile it dynamically.
Our app.module.ts looks like below :

<script src="https://gist.github.com/rahul-naik/b4dff211f37ab2a3ce4dc32d94db777b.js"></script>

Important : Custom Elements are self bootstrapping, so we don't need to bootstrap component in app.module.ts however we need to tell angular to bootstrap this module manually by adding ngDoBootstrap() method to AppModule Class.
We have imported `createCustomElement` method and passed our component class in that with injector.
We have used `customElements` window global object to define out custom-element with name `highlight-me` and implementation of custom element returned by createCustomeElement.
Define method actually register out custom element in customElementRegistry.
We are done with our configuration.
Let's update our package.json
Update scripts section to package.json to :
"build": "ng build –-prod –-output-hashing=none",
"package": "cat dist/<project_name>/{runtime,polyfills,scripts,main}.js > highlightme.js ",
We need to build application using ng build - prod and we have disable output hashing so that we can concatenate the the generated js files to single js file using package command above.
Run the build
Now execute following commands:
npm run build
And then
npm run package
This will in turn generate dist/ folder in root of our application and concatenate the js files generated by build process to single js file(highlightme.js).
Note: In case we have css defined in angular component then build process will generate css file for us.
Run Custom Element in Vanilla Javascript:
Create index.html in any other folder

<script src="https://gist.github.com/rahul-naik/a865972e8063885fde7b566de021d4f1.js"></script>

Note that I have included generated highlightme.js file in html and added
<highlight-me> Some Text </highlight-me> tag with color attribute
You can find full code in Github repo !