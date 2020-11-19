import React, { useState } from 'react'
import './OrderPage.css'
import Header from '../common/Header/Header'
import StepsTriangle from '../common/icons/StepsTriangle'
import Location from './Location/Location'
import Model from './Model/Model'
import Addition from './Addition/Addition'
import Total from './Total/Total'
import Status from './Status/Status'
import { Finished } from './Finished/Finished'
import classNames from 'classnames'
import { useFormik } from 'formik'

const OrderPage = ({ isFinished }) => {
  const [stepDisabled, setStepDisabled] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
  })

  const [step, setStep] = useState(3)

  const formik = useFormik({
    initialValues: {
      locationCity: '',
      locationPlace: '',
      modelFilter: 'Все модели',
      model: '',
      color: 'Любой',
      dateFrom: '',
      dateTo: '',
      plan: 'day',
      fullFuel: false,
      childSeat: false,
      rightHand: false,
    },
  })
  console.log(formik.values)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />
      case 2:
        return <Model formik={formik} />
      case 3:
        return <Addition formik={formik} />
      case 4:
        return <Total formData={formik.values} />
      default:
        return <Location formik={formik} />
    }
  }

  return (
    <div className='order-page'>
      <div className='order-page__header'>
        <Header />
      </div>
      <div className='order-page__steps'>
        <Steps
          isFinished={isFinished}
          step={step}
          setStep={setStep}
          stepDisabled={stepDisabled}
        />
      </div>
      <div className='order'>
        <div className='order__content-container'>
          <div className='order__content'>
            {isFinished ? <Finished formData={formik.values} /> : renderStep()}
          </div>
        </div>
        <div className='order__status-container'>
          <div className='order__status'>
            <Status
              isFinished={isFinished}
              step={step}
              setStep={setStep}
              stepDisabled={stepDisabled}
              setStepDisabled={setStepDisabled}
              formData={formik.values}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Steps = ({ isFinished, step, setStep, stepDisabled }) => {
  const stepNames = ['Местоположение', 'Модель', 'Дополнительно', 'Итого']
  const stepClass = (index) => {
    return classNames('steps__item-name', {
      'steps__item-name--active': step === index + 1,
    })
  }
  return (
    <div className='steps'>
      <div className='steps__items'>
        {isFinished ? (
          <span className='steps__finished'>Заказ номер RU58491823</span>
        ) : (
          stepNames.map((name, index) => (
            <div className='steps__item' key={name}>
              <button
                className={stepClass(index)}
                onClick={() => setStep(index + 1)}
                disabled={stepDisabled[index + 1]}>
                {name}
              </button>
              {index !== stepNames.length - 1 && <StepsTriangle />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderPage
