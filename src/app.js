const API_URL = "https://www.cheapshark.com/api/1.0/games";
const page = $("#grid")[0];

const getData = async (url) => {
    const response = await (
        await fetch(`${url}?title=batman&exact=0`)
    ).json();
    showData(response);

}

const getRetailPrice = async (id, ) => {
    const getRetailPriceData = await (await fetch(`${API_URL}?id=${id}`)).json();
    return Math.max.apply(
        Math,
        $.map(getRetailPriceData.deals, function(item) {
            return item.retailPrice;
        })
    )
}

const showData = async (data) => {
    $(page).empty();
    $(data).each(function(_index, item) {
        const {
            gameID,
            thumb,
            external,
            cheapest
        } = item;
        const showCards = $("<div>").addClass("w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 p-4");
        getRetailPrice(gameID).then(normalPrice => {
            const discountRate = Math.ceil(100 - (cheapest * 100 / normalPrice));            
            $(showCards).html(`   
          <div class="c-card block bg-gray-800 shadow-md hover:shadow-xl  overflow-hidden">
              <div class="relative h-36 overflow-hidden">
              <span class="absolute z-50 px-2 py-1 left-3 top-3 leading-none bg-red-600 shadow-md text-white rounded font-semibold  tracking-wide text-sm">%${discountRate}</span>
                  <img class="absolute inset-0 h-full w-full object-cover" src="${thumb}" alt="${external}">
              </div>
              <div class="p-4 min-h-[10rem]">
                
                  <p class="mt-2 mb-6  h-[3rem] font-semibold text-sm leading-6 text-white">${external}</p>
                  <div class="mt-3 flex flex-col ">
                      <div class=" text-xs text-slate-400">Normal Fiyat:  ${normalPrice} $</div>
                     
                  </div>
                  <div class="mt-3 flex flex-col ">
                  <div class="text-sm text-white">İndirimli Fiyat: ${cheapest} $</div>
                    
                  </div> 
                
              </div>
          </div>`);
            $(page).append(showCards);
        })
    });
}

getData(API_URL);