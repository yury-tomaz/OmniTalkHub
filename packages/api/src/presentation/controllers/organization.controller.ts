import { OrganizationFacadeFactory } from "@/modules/organization/factory/organization.facede.factory";
import { Request, Response } from "express";

export class OrganizationController{
    private service = OrganizationFacadeFactory.create();

    async add(req: Request, res: Response){
      const {name, realm, admin} = req.body;

      const execute = await this.service.addOrganization({
        admin,
        name,
        realm
      })

      return res.status(201).json({
        error: false,
        content:{...execute},
        message: 'Organization created successfully',
        _links: []
      });
    }
}