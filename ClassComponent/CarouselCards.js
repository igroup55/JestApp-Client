import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'


const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        
      />
    </View>
  )
}


export {CarouselCards}
const data = [
    {
      title:"שליח רכבת",
      body:"העבר חבילה בדרך ליעד שלך",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqBQFZad-q5WG7E_vK5_dalGXUnc0UZuwFg&usqp=CAU",
      page: 'NewTrainRoute',
    },
    {
      title: "שולח חבילה",
      body: "הפקד חבילה בתא הלוקר שבתחנת הרכבת הקרובה והעבר אותו לתחנת היעד",
      imgUrl: "https://boxit.co.il/wp-content/uploads/2018/01/package1-1.png",
      page: 'NewDelivery',
    },
    {
      title: "שליח אקספרס",
      body: "אסוף חבילות מתחנת הרכבת הקרובה אליך והעבר אותן ליעדן",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFE_RD4Ami3X_MJSye2A6yhSKhdpENyDehA&usqp=CAU",
      page: 'NewExpressRoute',

    }
  ]