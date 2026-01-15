import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

interface AuthenticatedRequest extends Request {
    user: any;
}

@Controller('purchase-orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PurchaseOrdersController {
    constructor(private readonly poService: PurchaseOrdersService) { }

    @Post()
    create(@Body() createDto: CreatePurchaseOrderDto, @Request() req: AuthenticatedRequest) {
        return this.poService.create(createDto, req.user);
    }

    @Get()
    findAll() {
        return this.poService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.poService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdatePurchaseOrderDto, @Request() req: AuthenticatedRequest) {
        return this.poService.update(id, updateDto, req.user);
    }
}
