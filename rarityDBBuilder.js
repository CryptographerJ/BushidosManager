
const puppeteer = require('puppeteer')

selector = "#__layout > div > div.absolute.top-0.z-10.w-screen.h-full.lg\:h-screen > div.absolute.z-30.justify-center.w-full.h-full.lg\:flex.top-12.l-0.lg\:top-0.lg\:items-center > div > div.mx-auto.text-center.lg\:overflow-auto.scrollColor > div > div.flex.flex-row.mx-4.mb-0\.5.mt-2.text-lg.textColor600.overflow-hidden.items-baseline > div:nth-child(1) > span"
        
        
    

;(async () => {         
    
    for (let i = 0; i <10; i++){
        
         console.log(`Looking at the rarity of Ronin # ${i}`)    

         const browser = await puppeteer.launch() // launch puppeteer
         const page = await browser.newPage() // function 
         await page.setDefaultNavigationTimeout(0)
         await page.goto(`https://rarity.tools/ronin-by-bushidos/view/${i}`, {waitUntil: 'networkidle0'})
         await page.waitForXPath("(//span[@class='font-bold whitespace-nowrap'])[1]")
         let elHandle = await page.$x("(//span[@class='font-bold whitespace-nowrap'])[1]")
         let RarityText = await page.evaluate(el => el.textContent, elHandle[0])
         rarityNumber = RarityText.split('#')[1]                   
         console.log(`Done with Ronin # ${i}; its rarity rank is ${rarityNumber}`)// output console message when completion is done.
         await browser.close()
        
    }

    })()

