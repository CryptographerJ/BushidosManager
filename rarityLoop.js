
const puppeteer = require('puppeteer')
        
        
    

;(async () => {         
    
    for (let i = 1999; i <2000; i++){
        
    
        console.log(i)    
        
        const viewPort = { width: 1280, height: 800 }
        const options = {
        path: `C:/SMImageGenBot/rarityToolsImages/rarityRonin${i}.png`,  // set's the name of the output image'
        fullPage: false,
            //dimension to capture
        clip: {x: 320, y: 50, width: 950-320, height: 750-50}};    

        const browser = await puppeteer.launch() // launch puppeteer
        const page = await browser.newPage() // function 
        await page.setViewport(viewPort)
        await page.setDefaultNavigationTimeout(0)
        await page.goto(`https://rarity.tools/ronin-by-bushidos/view/${i}`, {waitUntil: 'networkidle0'})
        await page.screenshot(options)                       
        console.log(`done with ${i}`)// output console message when completion is done.
        await browser.close()
        
    }
    })()

