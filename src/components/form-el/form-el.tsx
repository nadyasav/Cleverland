import React from 'react';
import { NavLink } from 'react-router-dom';

import { BaseBtn } from '../base-btn/base-btn';

import styles from './form-el.module.css';

interface IFormEl {
  title: string;
  steps?: { stepCount: number; stepCurrent: number; handleBtnClick: (stepCurrent: number) => void };
  children: React.ReactNode;
  btnText: string;
  btnDisabled: boolean;
  text: string;
  link?: {
    title: string;
    path: string;
    linkArrowIcon: string;
  };
}

export const FormEl = (props: IFormEl) => {
  const handleOnBtnClick = () => {
    if (props.steps) {
      props.steps.handleBtnClick(props.steps.stepCurrent);
    }
  };

  return (
    <div className={styles.form_el}>
      <p className={styles.form_el__title}>{props.title}</p>
      {props.steps && (
        <p className={styles.form_el__steps}>
          <span>{props.steps.stepCurrent} </span>
          шаг из
          <span> {props.steps.stepCount}</span>
        </p>
      )}
      <div className={styles.form_el__childrens}>{props.children}</div>
      <div className={styles.form_el__btn}>
        {props.steps && props.steps.stepCurrent < props.steps.stepCount && (
          <BaseBtn disabled={props.btnDisabled} onClick={handleOnBtnClick} stylesInherit={true}>
            {props.btnText}
          </BaseBtn>
        )}
        {(!props.steps || props.steps.stepCurrent === props.steps.stepCount) && (
          <BaseBtn disabled={props.btnDisabled} stylesInherit={true} type='submit'>
            {props.btnText}
          </BaseBtn>
        )}
      </div>

      <div className={styles.form_el__bottom}>
        <span className={styles.form_el__text}>{props.text}</span>
        {props.link && (
          <NavLink className={styles.form_el__link} to={props.link.path}>
            {props.link.title}
            {props.link.linkArrowIcon && (
              <img className={styles.form_el__link_icon} src={props.link.linkArrowIcon} alt='' />
            )}
          </NavLink>
        )}
      </div>
    </div>
  );
};
