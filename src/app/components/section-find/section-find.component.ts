import { Component, OnInit, inject } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";

import { Observable } from "rxjs";

import { FetchService } from "src/app/services/fetch.service";
import { Pokemon } from "src/app/common/pokemon.model";
import { CardItemPreviewComponent } from "../card-item-preview/card-item-preview.component";
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-section-find",
    templateUrl: "./section-find.component.html",
    styleUrls: ["./section-find.component.scss"],
    standalone: true,
    imports: [FormsModule, NgIf, LoadingSpinnerComponent, CardItemPreviewComponent]
})
export class SectionFindComponent implements OnInit {
    private fetchService = inject(FetchService);
    
	isLoading: boolean = false;
	errorMessage: string = "";

    fetchObs = new Observable<Pokemon>();

	ngOnInit(): void {
		this.fetchService.previewPokemon
        .subscribe(
			(resData) => {
				this.isLoading = false;
			},
			(error) => {
				console.log(error);
				this.errorMessage = error;
			}
		);
	}

	fetchPokemon(form: NgForm) {
		this.isLoading = true;
		const name = form.value.name;

        this.fetchService.fetchPokemon(name)
        .subscribe(
            response => {
                this.errorMessage = '';
            },
            error => {
                this.errorMessage = error;
                this.isLoading = false;
            }
        );

		form.reset();
	}
}
