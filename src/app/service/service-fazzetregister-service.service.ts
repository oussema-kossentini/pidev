import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceFazzetregisterService {

  constructor(private http: HttpClient) { }
getCountryCodes(): any[] {
    return [
        // Afrique
        { name: 'Algérie', code: '+213' },
        { name: 'Angola', code: '+244' },
        { name: 'Bénin', code: '+229' },
        { name: 'Botswana', code: '+267' },
        { name: 'Burkina Faso', code: '+226' },
        { name: 'Burundi', code: '+257' },
        { name: 'Cameroun', code: '+237' },
        { name: 'Cap-Vert', code: '+238' },
        { name: 'République centrafricaine', code: '+236' },
        { name: 'Tchad', code: '+235' },
        { name: 'Comores', code: '+269' },
        { name: 'Congo', code: '+242' },
        { name: "Côte d'Ivoire", code: '+225' },
        { name: 'Djibouti', code: '+253' },
        { name: 'Égypte', code: '+20' },
        { name: 'Guinée équatoriale', code: '+240' },
        { name: 'Érythrée', code: '+291' },
        { name: 'Éthiopie', code: '+251' },
        { name: 'Gabon', code: '+241' },
        { name: 'Gambie', code: '+220' },
        { name: 'Ghana', code: '+233' },
        { name: 'Guinée', code: '+224' },
        { name: 'Guinée-Bissau', code: '+245' },
        { name: 'Kenya', code: '+254' },
        { name: 'Lesotho', code: '+266' },
        { name: 'Liberia', code: '+231' },
        { name: 'Libye', code: '+218' },
        { name: 'Madagascar', code: '+261' },
        { name: 'Malawi', code: '+265' },
        { name: 'Mali', code: '+223' },
        { name: 'Maroc', code: '+212' },
        { name: 'Mauritanie', code: '+222' },
        { name: 'Maurice', code: '+230' },
        { name: 'Mozambique', code: '+258' },
        { name: 'Namibie', code: '+264' },
        { name: 'Niger', code: '+227' },
        { name: 'Nigeria', code: '+234' },
        { name: 'Rwanda', code: '+250' },
        { name: 'Sao Tomé-et-Principe', code: '+239' },
        { name: 'Sénégal', code: '+221' },
        { name: 'Seychelles', code: '+248' },
        { name: 'Sierra Leone', code: '+232' },
        { name: 'Somalie', code: '+252' },
        { name: 'Afrique du Sud', code: '+27' },
        { name: 'Soudan du Sud', code: '+211' },
        { name: 'Soudan', code: '+249' },
        { name: 'Swaziland', code: '+268' },
        { name: 'Tanzanie', code: '+255' },
        { name: 'Togo', code: '+228' },
        { name: 'Tunisie', code: '+216' },
        { name: 'Ouganda', code: '+256' },
        { name: 'Zambie', code: '+260' },
        { name: 'Zimbabwe', code: '+263' },
        // Amérique
        { name: 'Antigua-et-Barbuda', code: '+1-268' },
        { name: 'Argentine', code: '+54' },
        { name: 'Bahamas', code: '+1-242' },
        { name: 'Barbade', code: '+1-246' },
        { name: 'Belize', code: '+501' },
        { name: 'Bolivie', code: '+591' },
        { name: 'Brésil', code: '+55' },
        { name: 'Canada', code: '+1' },
        { name: 'Chili', code: '+56' },
        { name: 'Colombie', code: '+57' },
        { name: 'Costa Rica', code: '+506' },
        { name: 'Cuba', code: '+53' },
        { name: 'République dominicaine', code: '+1-809' },
        { name: 'Équateur', code: '+593' },
        { name: 'El Salvador', code: '+503' },
        { name: 'Grenade', code: '+1-473' },
        { name: 'Guatemala', code: '+502' },
        { name: 'Guyana', code: '+592' },
        { name: 'Haïti', code: '+509' },
        { name: 'Honduras', code: '+504' },
        { name: 'Jamaïque', code: '+1-876' },
        { name: 'Mexique', code: '+52' },
        { name: 'Nicaragua', code: '+505' },
        { name: 'Panama', code: '+507' },
        { name: 'Paraguay', code: '+595' },
        { name: 'Pérou', code: '+51' },
        { name: 'Saint-Kitts-et-Nevis', code: '+1-869' },
        { name: 'Sainte-Lucie', code: '+1-758' },
        { name: 'Saint-Vincent-et-les Grenadines', code: '+1-784' },
        { name: 'Suriname', code: '+597' },
        { name: 'Trinité-et-Tobago', code: '+1-868' },
        { name: 'Uruguay', code: '+598' },
        { name: 'Venezuela', code: '+58' },
        // Asie
        { name: 'Afghanistan', code: '+93' },
        { name: 'Arménie', code: '+374' },
        { name: 'Azerbaïdjan', code: '+994' },
        { name: 'Bahreïn', code: '+973' },
        { name: 'Bangladesh', code: '+880' },
        { name: 'Bhoutan', code: '+975' },
        { name: 'Brunei', code: '+673' },
        { name: 'Birmanie', code: '+95' },
        { name: 'Cambodge', code: '+855' },
        { name: 'Chine', code: '+86' },
        { name: 'Corée du Nord', code: '+850' },
        { name: 'Corée du Sud', code: '+82' },
        { name: 'Émirats arabes unis', code: '+971' },
        { name: 'Géorgie', code: '+995' },
        { name: 'Inde', code: '+91' },
        { name: 'Indonésie', code: '+62' },
        { name: 'Irak', code: '+964' },
        { name: 'Iran', code: '+98' },
        { name: 'Israël', code: '+972' },
        { name: 'Japon', code: '+81' },
        { name: 'Jordanie', code: '+962' },
        { name: 'Kazakhstan', code: '+7' },
        { name: 'Kirghizistan', code: '+996' },
        { name: 'Koweït', code: '+965' },
        { name: 'Laos', code: '+856' },
        { name: 'Liban', code: '+961' },
        { name: 'Malaisie', code: '+60' },
        { name: 'Maldives', code: '+960' },
        { name: 'Mongolie', code: '+976' },
        { name: 'Népal', code: '+977' },
        { name: 'Oman', code: '+968' },
        { name: 'Ouzbékistan', code: '+998' },
        { name: 'Pakistan', code: '+92' },
        { name: 'Philippines', code: '+63' },
        { name: 'Qatar', code: '+974' },
        { name: 'Sri Lanka', code: '+94' },
        { name: 'Syrie', code: '+963' },
        { name: 'Tadjikistan', code: '+992' },
        { name: 'Taïwan', code: '+886' },
        { name: 'Thaïlande', code: '+66' },
        { name: 'Timor oriental', code: '+670' },
        { name: 'Turkménistan', code: '+993' },
        { name: 'Turquie', code: '+90' },
        { name: 'Viêt Nam', code: '+84' },
        { name: 'Yémen', code: '+967' },
        // Europe
        { name: 'Albanie', code: '+355' },
        { name: 'Andorre', code: '+376' },
        { name: 'Autriche', code: '+43' },
        { name: 'Biélorussie', code: '+375' },
        { name: 'Belgique', code: '+32' },
        { name: 'Bosnie-Herzégovine', code: '+387' },
        { name: 'Royaume-Uni', code: '+44' },
        { name: 'Bulgarie', code: '+359' },
        { name: 'Croatie', code: '+385' },
        { name: 'Chypre', code: '+357' },
        { name: 'République tchèque', code: '+420' },
        { name: 'Danemark', code: '+45' },
        { name: 'Estonie', code: '+372' },
        { name: 'Finlande', code: '+358' },
        { name: 'France', code: '+33' },
        { name: 'Allemagne', code: '+49' },
        { name: 'Grèce', code: '+30' },
        { name: 'Hongrie', code: '+36' },
        { name: 'Islande', code: '+354' },
        { name: 'Irlande', code: '+353' },
        { name: 'Italie', code: '+39' },
        { name: 'Kosovo', code: '+383' },
        { name: 'Lettonie', code: '+371' },
        { name: 'Liechtenstein', code: '+423' },
        { name: 'Lituanie', code: '+370' },
        { name: 'Luxembourg', code: '+352' },
        { name: 'Macédoine du Nord', code: '+389' },
        { name: 'Malte', code: '+356' },
        { name: 'Moldavie', code: '+373' },
        { name: 'Monaco', code: '+377' },
        { name: 'Monténégro', code: '+382' },
        { name: 'Pays-Bas', code: '+31' },
        { name: 'Norvège', code: '+47' },
        { name: 'Pologne', code: '+48' },
        { name: 'Portugal', code: '+351' },
        { name: 'Roumanie', code: '+40' },
        { name: 'Russie', code: '+7' },
        { name: 'Saint-Marin', code: '+378' },
        { name: 'Serbie', code: '+381' },
        { name: 'Slovaquie', code: '+421' },
        { name: 'Slovénie', code: '+386' },
        { name: 'Espagne', code: '+34' },
        { name: 'Suède', code: '+46' },
        { name: 'Suisse', code: '+41' },
        { name: 'Ukraine', code: '+380' },
        { name: 'Vatican', code: '+379' }
    ];
}




    private baseUrl = 'http://localhost:8085/courszello/api/users'; // Ajustez selon votre configuration
    private apiAddUser = 'http://localhost:8085/courszello/api/users/add';

    getRoles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/roles`);
    }

    getNationalities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/nationalities`);
    }
    createUser(formData :FormData): Observable<any> {
    //  const formData = new FormData();
   //   formData.append('user', JSON.stringify(user));
     // if (file) {
       // formData.append('profilePicture', file);
     // }
    /* const formData = new FormData();
     formData.append('user', JSON.stringify(registerFormCustom)); // Ajoutez le formulaire utilisateur en tant que JSON

     if (registerFormCustom.profilePicture) {
       formData.append('profilePicture', registerFormCustom.profilePicture);
     }*/

      // Retourne l'Observable sans s'abonner ici
      return this.http.post(this.apiAddUser, formData);
    }

  }

