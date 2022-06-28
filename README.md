# Файловая структура

## В корневой папке проекта находятся папки  

### ./src  
> папка со всеми исходниками проекта  
> - ./favicon - файлы иконок и темы для различных браузеров и девайсов
> - ./fonts - шрифты проекта
> - ./img - графика проекта
>   - ./content - растровая графика  
>   - ./svg - векторная графика
> - ./js - папка для JavaScript файлов
> - ./pug - папка c файлами шаблонизатора PUG
>   - ./dates - массивы с данными
>   - ./layout - переиспользуемые блоки
>   - ./pages - блоки для страниц
> - ./styles - папка c файлами препроцессора SCSS
>   - ./blocks - БЭМ-блоки
>   - ./common - подключение шрифтов, общие стили, миксины и переменные

### ./build  
> папка для компиляции итоговых файлов

# Скрипты

## dev  
> запуск локального сервера и обновление вкладки браузера при обновлении файлов из папки `./src`  
`npm run dev`  
`yarn dev`  

## build  
> создание продакшн версии с сжатыми файлами  
`npm run build`  
`yarn build`

## lint  
> JS-линтинг  
`npm run lint`  
`yarn lint`  

## stylelint  
> SCSS-линтинг  
`npm run stylelint`  
`yarn stylelint`  

## lint:fix  
> JS-линтинг + исправление ошибок  
`npm run lint:fix`  
`yarn lint:fix`  

## stylelint:fix  
> SCSS-линтинг + исправление ошибок  
`npm run stylelint:fix`  
`yarn stylelint:fix`  

# gulp tasks

## htmlGenerator
> В режиме разработки `npm run dev` / `yarn dev`
> - Генерирует html страницы из pug файлов из папки ./pug  

> При сборке build-версии `npm run build` / `yarn build`
> - Генерирует html страницы из pug файлов из папки ./pug
> - Сжимает их
> - Создаёт обёртку из тега picture для растровой графики, чтобы при поддержке браузером загружать сжатое webp изображение

## styleGenerator
> В режиме разработки `npm run dev` / `yarn dev`
> - Генерирует css файл из index.scss

> При сборке build-версии `npm run build` / `yarn build`
> - Генерирует css файл из index.scss
> - Группирует медиа-запросы
> - Сжимает файл
> - Добавляет префиксы

## bundleJsGenerator
> В режиме разработки `npm run dev` / `yarn dev`
> - Генерирует один js файл из bundle.js

> При сборке build-версии `npm run build` / `yarn build`
> - Генерирует один js файл из bundle.js
> - Сжимает файл

## imagesConverter
> В режиме разработки `npm run dev` / `yarn dev`
> - Копирует растровую графику в папку ./build/img

> При сборке build-версии `npm run build` / `yarn build`
> - Копирует растровую графику в папку ./build/img
> - Генерирует webp файлы с одноимённым названием

## svgConverter
> Генерирует один sprite.svg из всех файлов векторной графики из папки ./img/svg

## favicon
> Копирует файлы в папку ./build/favicon

## fonts
> Копирует файлы в папку ./build/fonts

## server
> Запускает локальный сервер из папки build и обновляет страницу в браузере при изменении любых файлов в папке ./src

## clear
> Удаляет папку build, во избежание её засорения не актуальными файлами

## clearImg
> Очищает папку ./build/img

## clearFonts
> Очищает папку ./build/fonts

## watcher
> При изменении файлов в зависимости от отслеживаемых расширений запускает необходимую задачу
