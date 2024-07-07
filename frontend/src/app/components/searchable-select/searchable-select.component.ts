/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchbarCustomEvent } from '@ionic/angular';
import {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonModal,
    IonSearchbar,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';

const IONIC_IMPORTS = [
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonSearchbar,
    IonContent,
    IonItem,
    IonCheckbox,
];

@Component({
    standalone: true,
    imports: [...IONIC_IMPORTS, TranslocoModule, FormsModule],
    selector: 'car-searchable-select',
    templateUrl: './searchable-select.component.html',
    styleUrls: ['./searchable-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchableSelectComponent),
            multi: true,
        },
    ],
})
export class SearchableSelectComponent implements ControlValueAccessor {
    isOpen = signal(false);
    toggleFilterChange = signal(false);

    selectedItems = signal<any[] | undefined>([]);
    filteredItems = signal<any[] | undefined>([]);

    onChange!: (obj: any[]) => void;
    onTouched: (() => void) | undefined;

    data = model<any[]>([]);

    multiple = input.required<boolean>();

    visibleValue = input.required<string>();

    hiddenValue = input.required<string>();

    selectItem = output<any>();

    writeValue(input: any): void {
        if (Array.isArray(input)) {
            this.selectedItems.set(input);
        } else {
            const foundItem = [
                this.data()?.find((value) => value[this.hiddenValue()] === input),
            ].filter(Boolean);
            this.selectedItems.set(foundItem);
        }
        this.filteredItems.set(this.data());
    }

    registerOnChange(fn: (obj: any[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    open(): void {
        this.isOpen.set(true);
        const matchedItems = this.data()?.map((item) => {
            const itemFound = this.selectedItems()?.find(
                (selectedValue) => selectedValue[this.hiddenValue()] === item[this.hiddenValue()],
            );
            if (!itemFound) {
                const { selected, ...rest } = item;
                return rest;
            }
            return {
                ...item,
                selected: true,
            };
        });
        this.filteredItems.set(matchedItems);
    }

    cancel(): void {
        this.isOpen.set(false);
        this._resetFilteredItems();
    }

    select(): void {
        this._modifySelectedOutput();
        this._resetFilteredItems();
        this.isOpen.set(false);
    }

    filter(event: SearchbarCustomEvent): void {
        let filter = '';
        if (event.detail.value) {
            filter = event.detail.value.toLowerCase();
        }
        const updatedData = this.data()?.map((item) => {
            const itemFound = this.selectedItems()?.find(
                (selectedValue) => selectedValue[this.hiddenValue()] === item[this.hiddenValue()],
            );
            if (!itemFound) {
                const { selected, ...rest } = item;
                return rest;
            }
            return {
                ...item,
                selected: true,
            };
        });
        this.data.set([...updatedData]);
        let filteredItems: any[];
        if (filter) {
            filteredItems = this.data()?.filter(
                (item) => item[this.visibleValue()].toLowerCase().indexOf(filter) >= 0,
            );
        } else {
            filteredItems = [...this.data()];
        }
        this.filteredItems.set(filteredItems);
    }

    itemSelected(item: any): void {
        if (!this.multiple()) {
            if (this.selectedItems()?.length) {
                this.selectedItems.update(
                    (previouslySelectedItems) =>
                        previouslySelectedItems?.map((item, index) => {
                            if (index === 0) {
                                return {
                                    ...item,
                                    selected: false,
                                };
                            }
                            return item;
                        }),
                );
            }
            this.selectedItems.set([item]);
            this.select();
            this.selectItem.emit(item);
        } else {
            if (item.selected) {
                const mappedSelectedItems = [...(this.selectedItems() as any[]), item];
                this.selectedItems.set(mappedSelectedItems);
            } else {
                const filteredSelectedItems = this.selectedItems()?.filter(
                    (selectedItem) => selectedItem[this.hiddenValue()] !== item[this.hiddenValue()],
                );
                this.selectedItems.set(filteredSelectedItems);
            }
        }
    }

    private _modifySelectedOutput(): void {
        const selectedOutput = this.selectedItems()?.map(({ selected, ...rest }) => rest);
        this.onChange(selectedOutput as any[]);
    }

    private _resetFilteredItems(): void {
        this.filteredItems.update(
            (previouslyFilteredItems) =>
                previouslyFilteredItems?.map(({ selected, ...rest }) => rest),
        );
    }
}
