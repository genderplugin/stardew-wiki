import React, { useState } from 'react'
import { GiftItem } from './styleComponents/GiftItem'
import { GiftList } from './styleComponents/GiftList'
import { StyledDiv } from './styleComponents/StyledDiv'
import { VillageInfoContainer } from './styleComponents/VillageInfoContainer'
import { VillagerDescriptionDiv } from './styleComponents/VillagerDescriptionDiv'
import { VillagerDetailsBody } from './styleComponents/VillagerDetailsBody'
import { VillagerGiftBody } from './styleComponents/VillagerGiftBody'
import { VillagerGiftContainer } from './styleComponents/VillagerGiftContainer'
import { VillagerName } from './styleComponents/VillagerName'
import { XmlData } from '../data/XmlData'
import {villagers} from '../data/villagers'
import XMLParser from 'react-xml-parser'




function Villager() {



    const rawFile = new XMLHttpRequest();

    rawFile.open("GET", XmlData, true);
    rawFile.send();
    var xmlDoc = rawFile.responseXML;
    var xmlParser = new XMLParser();
    var xmlData = xmlParser.parseFromString(XmlData);
    var friendShipData = xmlData.getElementsByTagName("friendshipData");
    var parser = new DOMParser();
    var xmlDocParsed = parser.parseFromString(xmlDoc, "text/html");

    const [selectedVillagerId, setSelectedVillagerId] = useState(0);
    const selectedVillager = villagers.find(villager => villager.id == selectedVillagerId);
    const [season, setSeason] = useState('Spring');
    const [dayOfWeek, setDayOfWeek] = useState('Monday');
    const selectedDay = selectedVillager.springSchedule.find(day => day.day == dayOfWeek); //laughing ill fix this later. just remember the day equals the day equals the day equals the day.day equals the day
    return (
        <StyledDiv className='Styled Div'>
            <h1>Villager Page</h1>
            <div>
                <select value={selectedVillager.id} onChange={(e) => setSelectedVillagerId(e.target.value)}>
                    {
                        villagers.map(villager => <option value={villager.id}>{villager.name}</option>)
                    }
                </select>
            </div>
            <img src={selectedVillager.imagePath} alt={`${selectedVillager.name}`} />
            <VillagerDetailsBody className='Villager Details Body'>
                <VillagerGiftContainer className='Villager Gift Container'>
                    <VillagerGiftBody className='Villager Gift Name'>
                        <h1>Schedule</h1>
                        <select value={season} onChange={(e) => setSeason(e.target.value)}>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>
                        <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Rainy">Rainy</option>
                        </select>
                        <h2>{season} - {dayOfWeek}</h2>
                        <div>{selectedDay.schedule.map(singleSchedule => <p>{singleSchedule}</p>)}</div>
                    </VillagerGiftBody>
                </VillagerGiftContainer>
                <VillageInfoContainer className='Villager Info Container'>
                    <VillagerDescriptionDiv className='Villager Description Div'>
                        <VillagerName className='Villager Name'>{selectedVillager.name}</VillagerName>
                        <p>{selectedVillager.quote}</p>
                        <p>{selectedVillager.description}</p>
                    </VillagerDescriptionDiv>
                </VillageInfoContainer>
                <VillagerGiftContainer className='Villager Gift Container'>
                    <VillagerGiftBody className='Villager Gift Body'>
                        <h1>Best Gifts</h1>
                        <GiftList className='Gift List'>
                            {
                                selectedVillager.bestGifts.map(villagerGifts => <GiftItem><li><img src={villagerGifts.itemImage} /> {villagerGifts.itemName}</li> <br /></GiftItem>)
                            }
                        </GiftList>
                    </VillagerGiftBody>
                </VillagerGiftContainer>
            </VillagerDetailsBody>
        </StyledDiv>
    )
}

export default Villager