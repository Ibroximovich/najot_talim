import type { ReactNode } from "react";

export interface TeacherType {
    id:number,
    name:string,
    surname:string,
    age:number,
    stackId:number,
    regionId:number,
    disctrict:string
     statusId: number;
    experience: string;
    gender: string;
    email: string;
    phone: string;
    isMerried: string;
    study: string;
    createdAt: string;
    stack: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
    };
    region: {
        id: number;
        name: string;
        createdAt: string;
    };
    status: {
    id: number;
    name: string;
    createdAt: string;
  };

  workCompanies: {
    teacherId: string;
    workCompanyId: number;
    workCompany: {
      id: number;
      name: string;
      createdAt: string;
    };
  }[];
  value?:number
  label?:string
  key?:number
  stackName?:string
  action:ReactNode
}