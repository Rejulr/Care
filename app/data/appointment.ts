import {StateCreator} from 'zustand';

export type APPOINTMENTSlices = {
  fee: string;
  addFee: (fee: string) => void;

  dateRange: string;
  addDateRange: (dateRange: string) => void;

  customRange: boolean;
  addCustomRange: (customRange: boolean) => void;
};

export const createAppointmentSlices: StateCreator<
  APPOINTMENTSlices
> = set => ({
  fee: '',
  dateRange: '',
  customRange: false,

  addFee: fee => set(_ => ({fee: fee})),
  addDateRange: dateRange => set(_ => ({dateRange: dateRange})),
  addCustomRange: customRange => set(_ => ({customRange: customRange})),
});
