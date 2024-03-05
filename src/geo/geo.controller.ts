import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { GeoService } from './geo.service';
import { Response } from 'express';

@Controller('geo') // Базовый путь для маршрутов
export class GeoController {
    constructor(private readonly geoService: GeoService) {}

    @Get()
    async getGeoData(@Query('ip') ip: string, @Res() res: Response) {
        try {
            if (!ip) throw new Error('BadRequest');
            const data = this.geoService.getGeoData(ip);
            res.status(HttpStatus.OK).json(data);
        } catch (error) {
            switch (error.message) {
                case 'NotFound':
                    res.status(HttpStatus.NOT_FOUND).send();
                    break;
                case 'BadRequest':
                    res.status(HttpStatus.BAD_REQUEST).send();
                    break;
                default:
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            }
        }
    }
}
