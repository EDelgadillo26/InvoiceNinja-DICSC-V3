/**
 * Data Generator Utility
 * Generates random test data for automation tests
 */
export class DataGenerator {
    
    /**
     * Generates a random string of specified length
     * @param length The length of the string to generate
     * @param includeNumbers Whether to include numbers (default: true)
     * @returns Random string
     */
    static generateRandomString(length: number = 8, includeNumbers: boolean = true): string {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const characters = includeNumbers ? letters + numbers : letters;
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generates a random number within a range
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random number
     */
    static generateRandomNumber(min: number = 1, max: number = 9999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random company name
     * @returns Random company name
     */
    static generateCompanyName(): string {
        const prefixes = ['Tech', 'Global', 'Digital', 'Smart', 'Pro', 'Elite', 'Prime', 'Core', 'Next', 'Advanced'];
        const suffixes = ['Solutions', 'Corp', 'Industries', 'Systems', 'Services', 'Group', 'Partners', 'Enterprises', 'Labs', 'Works'];
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const randomNumber = this.generateRandomNumber(10, 999);
        
        return `${prefix}${suffix}${randomNumber}`;
    }

    /**
     * Generates a random first name
     * @returns Random first name
     */
    static generateFirstName(): string {
        const names = [
            'Juan', 'Carlos', 'Luis', 'Pedro', 'Miguel', 'Jose', 'Antonio', 'Manuel', 'Francisco', 'David',
            'Maria', 'Carmen', 'Ana', 'Isabel', 'Pilar', 'Dolores', 'Teresa', 'Rosa', 'Francisca', 'Antonia',
            'John', 'Michael', 'David', 'James', 'Robert', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
            'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'
        ];
        
        return names[Math.floor(Math.random() * names.length)];
    }

    /**
     * Generates a random last name
     * @returns Random last name
     */
    static generateLastName(): string {
        const surnames = [
            'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez', 'Hernandez', 'Perez', 'Sanchez', 'Ramirez', 'Cruz',
            'Vargas', 'Castillo', 'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortiz', 'Rubio', 'Marquez', 'Gutierrez',
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez'
        ];
        
        return surnames[Math.floor(Math.random() * surnames.length)];
    }

    /**
     * Generates a random email address
     * @param domain Optional domain (default: testdomain.com)
     * @returns Random email address
     */
    static generateEmail(domain: string = 'testdomain.com'): string {
        const firstName = this.generateFirstName().toLowerCase();
        const lastName = this.generateLastName().toLowerCase();
        const randomNumber = this.generateRandomNumber(100, 999);
        
        return `${firstName}.${lastName}${randomNumber}@${domain}`;
    }

    /**
     * Generates a random phone number
     * @param format Phone format (default: 'xxx-xxx-xxxx')
     * @returns Random phone number
     */
    static generatePhoneNumber(format: string = 'xxx-xxx-xxxx'): string {
        let phone = format;
        while (phone.includes('x')) {
            phone = phone.replace('x', Math.floor(Math.random() * 10).toString());
        }
        return phone;
    }

    /**
     * Generates a random address
     * @returns Random address object
     */
    static generateAddress(): {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    } {
        const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Park Ave', 'Hill Rd', 'Lake Dr', 'River St'];
        const cities = ['Springfield', 'Madison', 'Georgetown', 'Franklin', 'Clinton', 'Washington', 'Arlington', 'Centerville', 'Kingston', 'Salem'];
        const states = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];
        
        const streetNumber = this.generateRandomNumber(100, 9999);
        const street = streets[Math.floor(Math.random() * streets.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const postalCode = this.generateRandomNumber(10000, 99999).toString();
        
        return {
            street: `${streetNumber} ${street}`,
            city: city,
            state: state,
            postalCode: postalCode,
            country: 'US'
        };
    }

    /**
     * Generates a random website URL
     * @returns Random website URL
     */
    static generateWebsite(): string {
        const domains = ['com', 'net', 'org', 'biz', 'info'];
        const companyName = this.generateCompanyName().toLowerCase().replace(/\s+/g, '');
        const domain = domains[Math.floor(Math.random() * domains.length)];
        
        return `https://www.${companyName}.${domain}`;
    }

    /**
     * Generates a random VAT number
     * @returns Random VAT number
     */
    static generateVatNumber(): string {
        const prefix = 'VAT';
        const number = this.generateRandomNumber(100000000, 999999999);
        return `${prefix}${number}`;
    }

    /**
     * Generates a random ID number
     * @returns Random ID number
     */
    static generateIdNumber(): string {
        return this.generateRandomNumber(1000000, 9999999).toString();
    }

    /**
     * Generates complete client data
     * @returns Complete client data object
     */
    static generateClientData(): {
        company: {
            name: string;
            number: string;
            idNumber: string;
            website: string;
            phone: string;
            vatNumber: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        billing: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
    } {
        const address = this.generateAddress();
        
        return {
            company: {
                name: this.generateCompanyName(),
                number: `CLI${this.generateRandomNumber(1000, 9999)}`,
                idNumber: this.generateIdNumber(),
                website: this.generateWebsite(),
                phone: this.generatePhoneNumber(),
                vatNumber: this.generateVatNumber()
            },
            contact: {
                firstName: this.generateFirstName(),
                lastName: this.generateLastName(),
                email: this.generateEmail(),
                phone: this.generatePhoneNumber()
            },
            billing: {
                street: address.street,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country
            }
        };
    }

    /**
     * Generates a timestamp-based unique identifier
     * @returns Unique identifier string
     */
    static generateUniqueId(): string {
        const timestamp = Date.now();
        const randomString = this.generateRandomString(4, false);
        return `${randomString}${timestamp}`;
    }

    /**
     * Gets current timestamp for test naming
     * @returns Formatted timestamp
     */
    static getTimestamp(): string {
        const now = new Date();
        return now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    }
}