import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import Hero from "~/components/configurable/Hero"
import Heading from "../configurable/Heading"
import Block from "../configurable/Block"
import InfoStrip from "../configurable/InfoStrip"
import Collapsible from "../configurable/Collapsible"
import { markdownNodesFilter } from "~/utils"
import Col11 from "../grid/Col11"

import "./faq.scss"
import { useStaticQuery, graphql } from "gatsby"

const SolarTogetherFAQ = ({  }) => {

  return (
    <div className="faq-page">
      <Hero imageUrl="/images/quote-banner.jpg" compact>
        <Heading level={1} underlined>
          Solar Together FAQs
        </Heading>
      </Hero>
      <InfoStrip
        theme="light"
        email="devon@get-uk.com"
        phoneNumber="020 3866 9896"
      />
      <Block>
        <div className="container u-layout--indent">
          <div className="row" style={{marginBottom:"70px"}}>
            <Col11>
              <p>
              We're here to help.  Find the answer to your most common questions below, covering every detail of your solar installation. To go back to the Solar Together main page just <a href="/solar-together" style={{color:"#70b33b", fontWeight:"bold"}}>click here</a>.
              </p>
            </Col11>
          </div>
        </div>
        <div className="container u-layout--squidge container--column">
        <Collapsible                   
                    heading='How long do the solar panels usually last beyond the 25-year warranty?'
                    content='The Solar Panel itself will continue to generate after the 25 year warranty however the cell within it will continue to degrade outside of the warranted performance timeframe so we would recommend that the panels are replaced to ensure you can get the most of the renewable energy.'
                  />
                <Collapsible                   
                    heading='Do Solar Panels work with Smart Meters?'
                    content='Yes, Solar Panels work with Smart Meters, the more energy you generate and use in your household the less energy your meter will record from the grid. Your Smart Meter will also record export if you are using this for the Smart Export Guarantee however the meter we install will also record this.'
                  />
                <Collapsible                   
                    heading='Can we add a battery at a later date?'
                    content='Yes, a battery can be added at a later date, it is more cost effective to install at the same time as the solar panels however not essential.'
                  />
                <Collapsible                   
                    heading='What Maintenance is required on the panels and how often?'
                    content='As part of the installation we will connect your solar panels to a monitoring portal, this will send you any notifications if the system is not working as it should. In these instances, you should contact us and we will remotely diagnose any issues with your system. With regards to maintenance we recommend the panels are cleaned every 2 years, this can be done using a window cleaning contractor or we can provide this service. Electrical inspection is recommended to be every 2 years with the system being retested at this time.'
                  />
                <Collapsible                   
                    heading='Can panels go onto a flat roof?'
                    content='Yes this is possible, depending on the type of roof which we will determine during your survey we will be able to install a flat roof mounting structure fixed direct or supported using ballast.'
                  />
                <Collapsible                   
                    heading='How easy is it to repair the roof under panels?'
                    content='It is very simple, the panels are fixed using clamps which can be removed to allow access to the roof underneath it. We will check your roof prior to install and take lots of photos during the install to ensure we do not cause any damage.'
                  />
                <Collapsible                   
                    heading='What about multiple roof’s?'
                    content='We can install Solar on multiple roof’s, it will affect how the panels are connected to each other so we will determine the best way to install them at the design stage.'
                  />
                <Collapsible                   
                    heading='How much does a solar panel weigh?'
                    content='Typically a solar panels weights between 18-20 KG’s.'
                  />
                <Collapsible                   
                    heading='How delicate are the panels? As an example on a windy day will a falling branch damage the panels?'
                    content='The Solar Panels are very durable to ensure they last the full warranted 25 years. Birds, branches and minor debris will not damage the panels as the glass is designed to protect them.'
                  />
                <Collapsible                   
                    heading='Are we able to get electricity during a power cut?'
                    content='Typically no, however if you opt to have an Emergency Power Source (EPS) fitted with your solar panels you can use the charged energy (if you have a battery) from the Solar Panels on a selected outlet.'
                  />
                <Collapsible                   
                    heading='If the battery is full what happens to the surplus energy?'
                    content='In the first instance the solar energy will be directed to your house if you need the energy, the solar energy will then be directed to your batteries if you do not need the solar energy at that time. Once the batteries are full and you do not need the solar energy the energy will be exported to the grid. Please note if you want to change the operation of the batteries to work differently this can be done through the battery app.'
                  />
                <Collapsible                   
                    heading='Have you ever fitted any solar panels on a church roof?'
                    content='This is not something we have seen very often over the years however we have done 2 installations on church roofs. Due to the age of the buildings planning consent was needed on both occasions.'
                  />
                <Collapsible                   
                    heading='With technology changing all the time, how do we know if these panels and batteries wont be out of date in a year or so?'
                    content='The Panels, Inverters and Batteries we supply are at the forefront of the domestic market ensuring we are giving you the best technology available. Obviously over time technology improves however the estimated savings and performance of your system that we have designed is based on the technology present today. It may be that product development makes it cost effective in the future to change pieces of equipment for improved technology which is why we make sure each component is interchangeable.'
                  />
                <Collapsible                   
                    heading='Does my inverter need changing if I install a battery retro-fit?'
                    content='No, the battery system we offer can be stand alone from your existing inverter, however depending on the age of the inverter and where it is within its warranty lifecycle it may be cost effective for you to change it during the works.'
                  />
                <Collapsible                   
                    heading='Does your export company need to be the same company that you buy your energy from?'
                    content='No however often the grid supplier will offer preferential rates for export if they are involved in the Smart Export Guarantee scheme.'
                  />
                <Collapsible                   
                    heading='What Battery technology are you using: Lead or Lithium?'
                    content='The battery cells used are Class 1 Lithium Cells'
                  />
                <Collapsible                   
                    heading='How many charge cycles do they last for?'
                    content='We have a unique agreement with the battery supplier that means the battery is warranted for a length of time rather than cycles. This is 15 years from the date of installation and includes a performance warranty for this period also.'
                  />
                <Collapsible                   
                    heading='Typical Panel Failure rate'
                    content='0.05% is considered the typical panel failure rate which equates to a median failure rate of 5 out of 10,000 annually.'
                  />
                <Collapsible                   
                    heading='Do I have to have an up to date electrical certificate for installation to take place?'
                    content='No, it is not a requirement, we will carry out a minor works certificate on your property on completion of your installation. If we do find anything which requires attending from a safety perspective, we will assist with making it safe on site and offer you some advice about getting it repaired if necessary.'
                  />
                <Collapsible                   
                    heading='Do you make sure that any cabling is hidden within the cavity walls? I wouldn’t want cables to be visible outside or in?'
                    content='We will review the best cable routes with you when on site carrying out the survey to ensure the installation has minor impact on your property. Where possible we will install within the floor space and cavity walls however this is not always possible. In these instances, we will contain the cabling within aesthetically pleasing containment to ensure it does not detriment your property. We will agree this with you prior to any works taking place.'
                  />
                <Collapsible                   
                    heading='If I am planning to move in a few years, is it worth to invest in solar panels?'
                    content='More than ever! New research indicates that installing solar on your property can boost its value by over £30,000.'
                  />
                <Collapsible                   
                    heading='Does the power diverter work in conjunction with a gas boiler or do you end up heating water all with electricity?'
                    content='We will check your Gas and Electrical heating arrangement before recommending the Power Diverter to ensure that the Gas will only be utilised when required.'
                  />
                <Collapsible                   
                    heading='To get the best out of the battery, I was told that it`s best to use all the electricity/or as much as possible that it`s produced in one day. If you can`t - especially during the summer months will this be detrimental to the battery?'
                    content='This is not the case, the battery will store the energy until when you need to use it, if you consider that when the sun is down you will not be using any Solar Energy the Battery will be supplying you with any energy you have saved from the Solar (that your house did not need) during the day at night time to ensure you import as little power as possible, this will continue until the battery reaches its minimum charge level.'
                  />
                <Collapsible                   
                    heading='Where is the equipment Manufactured?'
                    content='The technology is manufactured from various locations throughout the world with the largest location being China. This is because the raw materials required for the Solar Panels and Batteries are readily available in China whereas they have to be imported in most other regions. We ensure all of our products and warranties are procured with market leading protections to ensure you receive the best product.'
                  />
        </div>
      </Block>
    </div>
  )
}

export default SolarTogetherFAQ
